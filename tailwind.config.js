/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#001233",
        "coral-red": "#fe5000",
        biege: "#efe0ca",
        white: "#ffffff",
        red: "#CD1818",
      },
    },
  },
  plugins: [],
};
