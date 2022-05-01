module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Righteous"', 'sans-serif'],
        body: ['"Righteous"', 'sans-serif'],
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
};
