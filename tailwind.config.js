/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#122033", brand: "#0F3D8A", sky: "#EAF2FF", mist: "#F5F7FA", lime: "#DDF3B8" },
      fontFamily: { sans: ["Inter", "Arial", "sans-serif"] },
      boxShadow: { soft: "0 18px 50px rgba(15,61,138,.10)" }
    }
  },
  plugins: []
};
