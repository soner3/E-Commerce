import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  handleSearchChange,
  handleSubmitSearch,
} from "../../features/searchSlice";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { search } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(handleSubmitSearch());
    navigate("/");
  }

  return (
    <form
      method="get"
      onSubmit={handleSubmit}
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
        onChange={(event) => dispatch(handleSearchChange(event.target.value))}
        className="dark:text-white rounded-r-full p-2 focus:ring-2 duration-500 outline-none w-64 xl:w-96 bg-transparent"
      />
    </form>
  );
}
