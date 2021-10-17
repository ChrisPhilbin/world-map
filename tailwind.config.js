module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"], //get rid of unused styles in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        100: 100,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
