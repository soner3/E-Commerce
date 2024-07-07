import React from "react";

interface SidebarBodyItemPropTypes {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isSidebarOpen: boolean;
}

export default function SidebarBodyItem({
  href = "#",
  children,
  icon,
  isSidebarOpen,
}: SidebarBodyItemPropTypes) {
  return (
    <>
      {isSidebarOpen ? (
        <a href={href} className="w-full">
          <li className="p-2 mb-2 font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer rounded-md flex gap-3">
            <div>{icon}</div>
            <p>{children}</p>
          </li>
        </a>
      ) : (
        <a href={href} className="w-full">
          <li className="p-5 border-b font-medium hover:bg-slate-200 hover:bg-opacity-40 hover:cursor-pointer">
            <div>{icon}</div>
          </li>
        </a>
      )}
    </>
  );
}
