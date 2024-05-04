import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        darkPrimary: "#1c1c1c",
        whitePrimary: "#f2f2f2",
      },
      backgroundColor: {
        darkPrimary: "#1c1c1c",
        whitePrimary: "#f2f2f2",
      },
    },
  },
  plugins: [tailwindScrollbar({ preferredStrategy: "pseudoelements" })],
};
