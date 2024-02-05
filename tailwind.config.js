/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
  "./src/components/**/*.{js,jsx,ts,tsx}", 
  "./src/images/**/*.{js,jsx,ts,tsx}", 
  "./src/pages/**/*.{js,jsx,ts,tsx}",
"./src/models/**/*.{js,jsx,ts,tsx}",
"./src/http-common.{js,jsx,ts,tsx}",
"./server.{js,jsx,ts,tsx}",
"./routes/**/*.{js,jsx,ts,tsx}",
"./controllers/**/*.{js,jsx,ts,tsx}",
"./models/**/*.{js,jsx,ts,tsx}",
"./config/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {},
    colors:{
      themeGreen: 'rgb(76, 119, 85)'
    }
  },
  plugins: [],
}

