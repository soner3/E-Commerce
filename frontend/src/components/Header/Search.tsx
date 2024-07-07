import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Search() {
  const [search, setSearch] = useState<string>("");

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch("");
  }

  return (
    <form
      method="get"
      onSubmit={handleSubmit}
      className="border dark:border-black rounded-full md:flex justify-center hidden"
    >
      <button
        type="submit"
        className="px-3 flex justify-center items-center bg-slate-100 dark:bg-slate-900 rounded-l-full hover:bg-gray-200 dark:hover:bg-white dark:hover:text-black"
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
        className="border-l rounded-r-full p-2 focus:ring-2 duration-500 outline-none w-64 xl:w-96 dark:text-black"
      />
    </form>
  );
}
