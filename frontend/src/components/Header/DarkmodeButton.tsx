import { useState } from "react";
import { BsCircleHalf, BsMoonStarsFill, BsSun } from "react-icons/bs";

export default function DarkmodeButton() {
  const [theme, setTheme] = useState<string>(getTheme());

  function handleTheme(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    if (selectedTheme === "light") {
      setLightMode();
    } else if (selectedTheme === "dark") {
      setDarkMode();
    } else if (selectedTheme === "system") {
      setSystemMode();
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="border h-full rounded-l-full flex justify-center items-center dark:border-black pl-1 bg-transparent">
        {theme === "system" ? (
          <BsCircleHalf className="size-6 ml-1 m-1" />
        ) : theme === "dark" ? (
          <BsMoonStarsFill className="size-6 ml-1 m-1" />
        ) : (
          <BsSun className="size-6 ml-1 m-1" />
        )}
      </div>
      <select
        name="theme"
        id="theme"
        className="rounded-r-full h-full px-1 dark:bg-transparent dark:border-black dark:hover:bg-slate-900 active:dark:text-sky-500 outline-none border font-medium hover:cursor-pointer bg-transparent active:bg-sky-500 active:text-white"
        value={theme}
        onChange={handleTheme}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}

function setLightMode(): void {
  localStorage.theme = "light";
  applyTheme();
}

function setDarkMode(): void {
  localStorage.theme = "dark";
  applyTheme();
}

function setSystemMode(): void {
  localStorage.removeItem("theme");
  applyTheme();
}

function applyTheme(): void {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function getTheme(): string {
  const storedTheme: string | null = localStorage.getItem("theme");
  if (storedTheme === null) {
    applyTheme();
    return "system";
  } else {
    applyTheme();
    return storedTheme;
  }
}
