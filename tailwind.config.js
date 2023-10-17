/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f5f5",
        page_modal: "#00000080",
        secondary: "#2B2D42",
        tertiary: "#EF233C",
        tertiary_hover: "#D90429",
        gray: "#8D99AE",
      },
      transitionProperty: {
        'modal': 'opacity, visibility',
      }
    },
  },
  plugins: [],
}

