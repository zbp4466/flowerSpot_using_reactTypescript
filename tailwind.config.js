/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "linear-gradient": "#ECBCB3",
      "linear-gradient-2": "#EAA79E",
      "linear-gradient-dark": "#DF9186",
      "linear-gray": "#334144",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      Montserrat: ["Montserrat", "sans-serif"],
      Ubuntu: ["Ubuntu", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
