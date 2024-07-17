/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      'prim':'#02d9a1',
      'primary':"#1476ff",
      'secondary':"#f3f5ff",
      'light':'#f9faff',
    },
    extend: {},
  },
  plugins: [],
}

