module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
          "--rounded-box": "0.2rem",
          "--rounded-btn": "0.2rem",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#ef4444",
          "base-100": "#0f0f0f",
          "base-content": "#ffffff",
          secondary: "#9ca3af",
          "--rounded-box": "0.2rem",
          "--rounded-btn": "0.2rem",
        },
      },
    ],
  },
};
