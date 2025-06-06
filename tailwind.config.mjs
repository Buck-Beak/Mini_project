/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        typewriter: {
          to: {
            left: "100%"
          }
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        typewriter: 'typewriter 2s steps(11) forwards',
        caret: 'typewriter 2s steps(11) forwards, blink 1s steps(11) infinite 2s',
        fade: "fade 2s ease-in-out forwards",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },

  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  const colors = theme("colors");

  // Flatten Tailwind color objects into CSS variables
  let newVars = Object.fromEntries(
    Object.entries(colors).flatMap(([color, value]) => {
      if (typeof value === "object") {
        return Object.entries(value).map(([shade, hex]) => [`--${color}-${shade}`, hex]);
      }
      return [[`--${color}`, value]];
    })
  );

  addBase({
    ":root": newVars,
  });
}
