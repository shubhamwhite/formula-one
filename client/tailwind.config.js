/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "mobile": '480px', 
      },
      colors: {
        "primary": '#00224D',    // Replace with your primary color
        "secondary": '#5D0E41',  // Replace with your secondary color
        "accent": '#A0153E',     // Replace with your accent color
        "gray": "#F0F0F0",
        "neutral": '#FF204E',    // Replace with your neutral color
      },
    },
  },
  plugins: [],
}
