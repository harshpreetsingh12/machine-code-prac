/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include this to scan the main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust to match the file types you're using
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
