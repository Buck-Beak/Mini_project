## Learnify - Your Smart Study Companion

**Learnify** is an AI-powered education platform designed to help students and educators by transforming bulky textbooks and PDFs into clear, structured notes, flashcards, and question papers. It uses advanced NLP techniques to make learning efficient and accessible.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [Home](#home)
  - [Firebase](#firebase)
  - [NavBar](#navbar)
  - [Signup](#signup)
  - [Login](#login)
  - [Summary](#summary)
  - [Question Paper](#question-paper)
  - [Flash Cards](#flashcards)
- [Screenshots](#screenshots)

## Installation

1. Clone the repository

```sh
git clone https://github.com/your-username/learnify.git
cd learnify
```

2. Install the dependencies:

```sh
npm install
```

3. Run the app

```sh
npm run dev
```

4. Install Firebase

```sh
npm install firebase
```

## Usage

1. Sign up or log in via email.
2. Upload any educational PDF.
3. Let Learnify generate a structured summary using BART.
4. Instantly convert the summary into:
    a. Flash Cards 
    b. Question Papers 
5. Save summaries for future reference.

## Components

### Home
This is the dashboard page of the Learnify platform that welcomes the user and displays their most recently generated summaries. It offers a quick overview of learning activity tailored to each logged-in user.

### Firebase
Firebase configuration is done in this page.

### Navbar
This is the sidebar navigation bar for the Learnify platform, providing quick access to key features like Dashboard, Summarization, and Settings. It includes user info, dark mode toggle, and a logout option for seamless user experience.

### Signup
Signup page where users can signup using their email and password. Authentication is done using Firebase Auth.

### Login
Registered users can login using their email and password which is authenticated using Firebase Auth.

### Summary
The Summary page allows users to:

1. Upload PDF documents
2. Extract text using pdfjs-dist
3. Use the BART model to generate concise summaries
4. Save summaries to Firebase and localStorage
5. Navigate to Flash Cards and Question Paper generation pages

### Question Paper
The Question paper page generates question papers with the generated summary using Gemini API.

### Flash Cards
The Flash Cards page generates flash cards with the generated summary using Gemini API.

### Screenshots






