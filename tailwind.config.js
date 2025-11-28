/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Lexend Deca"', '"Trebuchet MS"', '"Helvetica Neue"', 'Helvetica', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
