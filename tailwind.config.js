module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"], //get rid of unused styles in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
