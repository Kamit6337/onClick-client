/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        color_1: "#112D4E",
        color_2: "#3F72AF",
        color_3: "#DBE2EF",
        color_4: "#F9F7F7",
      },
    },
    screens: {
      big_lap: { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      laptop: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      sm_lap: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      tablet: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      mobile: { max: "640px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
