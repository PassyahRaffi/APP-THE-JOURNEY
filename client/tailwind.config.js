module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueSea: "#2E86DE",
      },
      backgroundImage: {
        jumbotron: "url('/src/assets/jumbotron.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
