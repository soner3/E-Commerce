import { BsArrowUpCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface SidebarFooterPropTypes {
  children: React.ReactNode;
}

export default function SidebarFooter({ children }: SidebarFooterPropTypes) {
  const { isSidebarOpen } = useSelector((state: RootState) => state.sidebar);

  return (
    <>
      {isSidebarOpen ? (
        <>
          <hr />
          <div className="w-full mt-2 mb-16">
            <a href={"#top"} className="">
              <li className="p-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex items-center gap-3">
                <div>
                  <BsArrowUpCircleFill className="size-5" />
                </div>
                <p>{children}</p>
              </li>
            </a>
          </div>
        </>
      ) : (
        <div className="w-full mb-14">
          <a href={"#top"} className="">
            <li className="p-5 border-t border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer flex">
              <div>
                <BsArrowUpCircleFill className="size-7" />
              </div>
            </li>
          </a>
        </div>
      )}
    </>
  );
}
