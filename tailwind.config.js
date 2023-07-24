/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1F3F77',
        'light-blue': '#0054A6',
        'light-red': '#A61A11',
        'dark-red': '#89160F',
        'dark-gray': '#414042',
        'light-gray': '#F1F2F4',

      }
    },
  },
  plugins: [],
}

