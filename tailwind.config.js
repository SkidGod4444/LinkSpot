/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'lato-regular': ['Lato-Regular'],
        'lato-bold': ['Lato-Bold'],
        'lato-italic': ['Lato-Italic'],
        'lato-bold-italic': ['Lato-BoldItalic'],
      },
    },
  },
  plugins: [],
}