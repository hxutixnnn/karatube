module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("daisyui"),
  ],
  theme: {
    fontSize: {
      sm: "0.7rem",
      base: "0.8rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  daisyui: {
    themes: [
      {
        karatube: {
          // ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#b91c1c",
          // "primary-content": "#ffffff",
          secondary: "#2563eb",
          accent: "#1dcdbc",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
          // "--rounded-box": "0.2rem",
          // "--rounded-btn": "0.2rem",
        },
      },
    ],
  },
};
