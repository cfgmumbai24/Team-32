/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#43808F',
        secondary: '#5CCCCE',
        complementary1: '#8F4343',
        complementary2: '#CE5C5C',
        accent1: '#73A6B3',
        accent2: '#3A6E77',
        accent3: '#7FDDDD',
        accent4: '#4BA9AA',
        neutralLight: '#F5F5F5',
        neutralMid: '#DDDDDD',
        neutralDark: '#333333',
      },
    },
  },
  plugins: [],
}