import DarkmodeButton from "./DarkmodeButton";
import Logo from "../Logo";
import NavbarButton from "./NavbarButton";
import Search from "./Search";

export default function Header() {
  return (
    <header className="flex sticky justify-between p-2 top-0 w-full dark:border-black border bg-transparent dark:bg-transparent dark:text-sky-500 dark:bg-slate-900 shadow-xl duration-500 backdrop-blur">
      <div className="flex justify-center items-center gap-3">
        <NavbarButton />
        <a href="#">
          <Logo>MyShop</Logo>
        </a>
      </div>
      <Search />
      <DarkmodeButton />
    </header>
  );
}
