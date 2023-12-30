"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) return null;

  return (
    <Button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      Switch Theme
    </Button>
  );
};

export default ThemeSwitcher;
