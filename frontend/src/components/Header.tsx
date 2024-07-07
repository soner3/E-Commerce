import DarkmodeButton from "./DarkmodeButton";
import Logo from "./Logo";
import NavbarButton from "./NavbarButton";
import Search from "./Search";

export default function Header() {
  return (
    <header className="flex justify-between p-2 top-0 w-screen dark:border-black border bg-transparent bg-white text-black dark:text-white dark:bg-slate-900 shadow-xl">
      <div className="flex justify-center items-center gap-3">
        <NavbarButton />
        <a href="#">
          <Logo>Logo</Logo>
        </a>
      </div>
      <Search />
      <DarkmodeButton />
    </header>
  );
}
