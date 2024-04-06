/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require("tailwind-scrollbar")],

  content: [],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#f7b801",
          50: "#F7E8BA",
          100: "#F7E3A8",
          200: "#F7DF95",
          300: "#F7DA83",
          400: "#F7D15D",
          500: "#F7CC4A",
          600: "#F7C735",
          700: "#F7C221",
          800: "#F7B900",
          900: "#d7a001",
          950: "#b78801",
        },
      },
      scrollbar: {
        thumb: {
          backgroundColor: "#f7b801",
          borderRadius: "9999px",
        },
        track: {
          backgroundColor: "#2d3748",
        },
      },
    },
  },
};
