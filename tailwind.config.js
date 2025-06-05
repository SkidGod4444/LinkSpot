/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#FACC15",
        background: "#F9FAFB",
        dark: "#0F172A",
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