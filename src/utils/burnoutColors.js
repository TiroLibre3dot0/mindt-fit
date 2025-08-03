// src/utils/burnoutColors.js

const getColorPalette = (level) => {
  switch (level) {
    case "low":
      return {
        main: "#2f9e44",
        light: "#e6f4ea",
        text: "#1b7030"
      };
    case "moderate":
      return {
        main: "#ff9f43",
        light: "#fff5e8",
        text: "#a85e00"
      };
    case "high":
    default:
      return {
        main: "#e03131",
        light: "#fff0f0",
        text: "#801f1f"
      };
  }
};
export { getColorPalette };
