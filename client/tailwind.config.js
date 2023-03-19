/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": '#29183c',
        "secondary-dark": '#FDB813',
        "background-dark": "#FDF0D5",
        "overlay-dark": '#E9D8FD',
        'text-dark': '#FFFFFF',

        "primary-light": '#fafad0',
        "secondary-light": '#4c4c4c',
        "background-light": "#FFFFFF",
        "overlay-light": '#DDDDDD ',
        'text-light': '#4c4c4c',

      },
    },
  },
  plugins: [],
}
