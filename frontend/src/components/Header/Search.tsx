import { BsSearch } from "react-icons/bs";
import { useMyShopContext } from "../../contexts/MyShopContext";

export default function Search() {
  const { handleSearchChange, handleSearchSubmit, search } = useMyShopContext();

  return (
    <form
      method="get"
      onSubmit={handleSearchSubmit}
      className="border dark:border-black rounded-full md:flex justify-center hidden"
    >
      <button
        type="submit"
        className="px-3 flex justify-center items-center border-r dark:border-none bg-slate-100 dark:bg-slate-900 rounded-l-full hover:bg-gray-200 hover:dark:bg-slate-900"
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
        className="dark:text-white rounded-r-full p-2 focus:ring-2 duration-500 outline-none w-64 xl:w-96 bg-transparent"
      />
    </form>
  );
}
