import {
  BsArrowLeftCircleFill,
  BsFillHouseDoorFill,
  BsSearch,
} from "react-icons/bs";
import Logo from "../Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { handleSidebar } from "../../features/sidebarSlice";
import {
  handleSubmitSearch,
  handleSearchChange,
} from "../../features/searchSlice";

export default function SidebarHeader() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebar);
  const { search } = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(handleSubmitSearch());
    navigate("/app");
  }

  return (
    <>
      {isSidebarOpen ? (
        <>
          <div className="flex items-center justify-between p-1 mb-2">
            <NavLink to={"/app"}>
              <Logo>MyShop</Logo>
            </NavLink>
            <button onClick={() => dispatch(handleSidebar())}>
              <BsArrowLeftCircleFill className="size-7" />
            </button>
          </div>
          <hr className="mb-2" />

          <form
            method="get"
            onSubmit={handleSubmit}
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
              onChange={(event) =>
                dispatch(handleSearchChange(event.target.value))
              }
              className="rounded-r-full p-2 focus:ring-2 outline-none w-64 xl:w-96 text-black"
            />
          </form>
        </>
      ) : (
        <>
          <NavLink to={"/app"}>
            <div className="p-5 border-b hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer">
              {<BsFillHouseDoorFill className="size-7" />}
            </div>
          </NavLink>
        </>
      )}
    </>
  );
}
