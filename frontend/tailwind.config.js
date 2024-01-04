// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkMode: 'class', // Enable the dark mode class variant
      // You can extend the theme with additional customizations here
    },
  },
  plugins: [],
};
