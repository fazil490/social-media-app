/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Karla: "Karla",
        KSans: "Kumbh Sans",
      },
      colors: {
        darkGray: "#292929",
        skyBlueTxt: "#3C8DFF",
        postBgLav: "#F7EBFF",
        postBgPink: "#FFFAEE",
        lightGrayBg: "#D9D9D9",
        likePink: "#D95B7F",
      },
    },
  },
  plugins: [],
};
