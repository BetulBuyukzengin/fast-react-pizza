/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  //
  theme: {
    // create new font fam
    fontFamily: {
      sans: 'Roboto Mono,monospace',
    },
    extend: {
      // colors:{pizza:#32323}
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
