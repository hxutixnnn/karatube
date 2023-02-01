module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          secondary: "#6b7280",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "base-100": "#0f0f0f",
          "base-content": "#ffffff",
          secondary: "#9ca3af",
        },
      },
    ],
  },
};
