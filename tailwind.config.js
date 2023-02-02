module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#ef4444",
          secondary: "#6b7280",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#ef4444",
          "base-100": "#0f0f0f",
          "base-content": "#ffffff",
          secondary: "#9ca3af",
        },
      },
    ],
  },
};
