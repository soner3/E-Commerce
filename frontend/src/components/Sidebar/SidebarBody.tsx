import { useMyShopContext } from "../../contexts/MyShopContext";
import SidebarBodyItem from "./SidebarBodyItem";
import { FaShoppingCart, FaUser } from "react-icons/fa";

interface ItemType {
  href: string;
  icon: React.ReactNode;
  name: string;
}

export default function SidebarBody() {
  const { isSidebarOpen } = useMyShopContext();

  let nextId = 0;

  const items: ItemType[] = [
    {
      href: "#",
      icon: (
        <FaShoppingCart className={`${isSidebarOpen ? "size-5" : "size-7"}`} />
      ),
      name: "Cart",
    },
    {
      href: "#",
      icon: <FaUser className={`${isSidebarOpen ? "size-5" : "size-7"}`} />,
      name: "Login",
    },
  ];

  return (
    <ul className="flex flex-col flex-grow">
      {items.map((item) => {
        nextId++;
        return (
          <SidebarBodyItem
            key={nextId}
            isSidebarOpen={isSidebarOpen}
            icon={item.icon}
            href={item.href}
          >
            {item.name}
          </SidebarBodyItem>
        );
      })}
    </ul>
  );
}
