/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: '#280070', // Кастомный цвет темно-фиолетового оттенка для фона
      },
    },
  },
  plugins: [],
};
