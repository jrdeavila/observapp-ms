/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1182C3",
        secondary: "#002B56",
        tertiary: "#005484",
        light: "#F6F6F6",
        dark: "#333333",
        error: "#FF0000",
        success: "#00FF00",
        warning: "#FFA500",
        info: "#0000FF",
        transparent: "transparent",
      },
      fontFamily: {
        sans: ["Geomanist", "sans-serif"],
      },
      backgroundColor: "#F6F6F6",
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
