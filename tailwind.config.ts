import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        custom: { max: "640px" },
        custom2: { max: "899px" },
        custom3: { min: "900px" },
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }: { addUtilities: any; theme: any }) {
      const newUtilities = {
        ".custom-ul-display": {
          display: "block!important",
          transition: "0.3s!important",
        },
        ".custom-ul-figure": {
          right: "-70% !important",
        },
        ".custom-goods-inner-div": {
          paddingLeft: "20px!important",
          paddingRight: "20px!important",
        },
        ".custom-goods-inner": {
          fontSize: "28px!important",
          padding: "40px 0 15px 0!important",
        },
        ".custom-tick_sec-br": {
          display: "none !important",
        }
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
export default config;
