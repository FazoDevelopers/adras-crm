/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3f86",
        secondary: "#26acdb",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
