module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      light: ['"Avenir Light"'],
      roman: ['"Avenir Roman"'],
      book: ['"Avenir Book"'],
    },
    extend: {
      colors: {
        green: {
          default: "#14C704",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
