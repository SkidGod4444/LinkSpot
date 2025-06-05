/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#27272A",
        background: "#F9FAFB",
        dark: "#18181B",
        accent: "#10B981",
      },
      fontFamily: {
        'lato-regular': ['Lato-Regular'],
        'lato-bold': ['Lato-Bold'],
        'lato-italic': ['Lato-Italic'],
        'lato-bold-italic': ['Lato-BoldItalic'],
      },
    },
  },
  plugins: [],
  compilerOptions: {
    strict: true,
    paths: {
      "@/*": ["./*"],
    },
  },
}