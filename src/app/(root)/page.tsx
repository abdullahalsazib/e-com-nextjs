import React from "react";
import HomePage from "./(pages)/home/page";
import { ThemeProvider } from "../context/ThemeContext";

export default function page() {
  return (
    <>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </>
  );
}
