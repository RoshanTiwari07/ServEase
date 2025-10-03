/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#1C1C1E', // Primary Background
        },
        mocha: {
          50: '#2C2C2E', // Card Background
          100: '#3A3A3C', // Alternative Card Background
        },
        gold: {
          50: '#F5B700', // Accent Gold/Saffron
          accent: '#F5B700', // Alternative alias
        },
        emerald: {
          50: '#2ECC71', // Accent Emerald Green
        },
        offwhite: {
          50: '#F2F2F7', // Text Primary
        },
        warmgrey: {
          50: '#A1A1AA', // Text Secondary
        },
      },
    },
  },
  plugins: [],
}