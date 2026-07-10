/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#ff2442',//redBook红
      },
      spacing: {
        'nav-h': '60px',
      },
      maxWidth: {
        'container': '1080px',
      }
    },
  },
  plugins: [],
}
