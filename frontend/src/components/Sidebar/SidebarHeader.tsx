import {
  BsArrowLeftCircleFill,
  BsFillHouseDoorFill,
  BsSearch,
} from "react-icons/bs";
import Logo from "../Logo";
import { useMyShopContext } from "../../contexts/MyShopContext";

export default function SidebarHeader() {
  const {
    isSidebarOpen,
    handleIsSidebarOpen,
    handleSearchChange,
    handleSearchSubmit,
    search,
  } = useMyShopContext();

  return (
    <>
      {isSidebarOpen ? (
        <>
          <div className="flex items-center justify-between p-1 mb-2">
            <a href="#" className="flex justify-center items-center">
              <Logo>MyShop</Logo>
            </a>
            <button onClick={handleIsSidebarOpen}>
              <BsArrowLeftCircleFill className="size-7" />
            </button>
          </div>
          <hr className="mb-2" />

          <form
            method="get"
            onSubmit={handleSearchSubmit}
            className="rounded-full md:hidden justify-center flex my-2"
          >
            <button
              type="submit"
              className="border duration-300 hover:bg-slate-200 hover:bg-opacity-40 px-3 flex justify-center items-center rounded-l-full"
            >
              <BsSearch className="size-5" />
            </button>
            <input
              type="search"
              name="search"
              id="searchId"
              value={search}
              placeholder="Search"
              onChange={handleSearchChange}
              className="rounded-r-full p-2 focus:ring-2 outline-none w-64 xl:w-96 text-black"
            />
          </form>
        </>
      ) : (
        <>
          <div className="p-5 border-b hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer">
            <a href="#">{<BsFillHouseDoorFill className="size-7" />}</a>
          </div>
        </>
      )}
    </>
  );
}
