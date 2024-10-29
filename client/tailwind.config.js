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
        "primary": '#1B262C',    // Replace with your primary color
        "secondary": '#0F4C81',  // Replace with your secondary color
        "accent": '#ED6663',     // Replace with your accent color
        "neutral": '#FFA372',    // Replace with your neutral color
        "light": "#F4F6FF"
      },
    },
  },
  plugins: [],
}
