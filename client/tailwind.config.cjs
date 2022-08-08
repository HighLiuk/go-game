/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        page: "url('/img/background.webp')",
        board: "url('/img/board.svg')",
      },
    },
  },
  plugins: [],
}
