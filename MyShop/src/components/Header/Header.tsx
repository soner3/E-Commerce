import DarkmodeButton from "./DarkmodeButton";
import Logo from "../Logo";
import NavbarButton from "./NavbarButton";
import Search from "./Search";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex sticky justify-between p-2 top-0 w-full dark:border-black border bg-transparent dark:bg-transparent dark:text-sky-500 dark:bg-slate-900 shadow-xl duration-500 backdrop-blur z-10">
      <div className="flex justify-center items-center gap-3">
        <NavbarButton />
        <NavLink to={"/app"}>
          <Logo>MyShop</Logo>
        </NavLink>
      </div>
      <Search />
      <DarkmodeButton />
    </header>
  );
}
