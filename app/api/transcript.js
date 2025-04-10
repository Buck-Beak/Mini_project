// pages/api/transcript.js
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId parameter' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/watch?v=${videoId}`, {
      waitUntil: 'networkidle2'
    });

    // Click the CC button to enable captions
    await page.click('button.ytp-subtitles-button');
    await page.waitForTimeout(2000);

    // Extract captions
    const captions = await page.evaluate(() => {
      const captionElements = document.querySelectorAll('.captions-text span');
      return Array.from(captionElements).map(el => el.textContent).join(' ');
    });

    if (!captions) {
      throw new Error('No captions found');
    }

    res.status(200).json({ transcript: captions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) await browser.close();
  }
}