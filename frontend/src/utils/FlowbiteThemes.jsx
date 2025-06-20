import { Button, createTheme, ThemeProvider } from "flowbite-react";

export const customTheme = createTheme({
  button: {
    color: {
      tealButton: "bg-teal-600 hover:bg-teal-700",
      whiteButton: "bg-white",
      redButton: "bg-red-500 hover:bg-red-600"
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});
