const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: "class",
  // purge: {
  //   enable: true,
  //   content: ["./src/**/*.tsx"],
  //   options: {
  //     safelist: ["dark"], //specific classes
  //   },
  // },
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--montserrat-font)", ...fontFamily.sans],
      },
      // typography: (theme) => ({
      //   dark: {
      //     css: {
      //       color: "white",
      //     },
      //   },
      // }),
    },
  },
  // variants: {
  //   typography: ["dark"],
  // },
  // plugins: [require("@tailwindcss/typography")],
  plugins: [require("flowbite/plugin")],
};
