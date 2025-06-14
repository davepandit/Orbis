import { Button, createTheme, ThemeProvider } from "flowbite-react";

export const customTheme = createTheme({
  button: {
    color: {
      headerRedButton: "bg-red-500 hover:bg-red-600",
      secondary: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});
