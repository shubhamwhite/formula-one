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
        "primary": '#363863',    // Replace with your primary color
        "secondary": '#F8E796',  // Replace with your secondary color
        "accent": '#C98B70',     // Replace with your accent color
        "neutral": '#F8E796',    // Replace with your neutral color
      },
    },
  },
  plugins: [],
}
