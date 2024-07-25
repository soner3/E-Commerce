import { memo } from "react";

interface PropType {
  children: React.ReactNode;
}

const ProductCard = memo(function ProductCard({ children }: PropType) {
  return (
    <div className="group border hover:text-white hover:bg-gradient-to-b hover:from-cyan-400 hover:to-blue-500 hover:dark:from-cyan-600 hover:dark:to-blue-700 dark:border-sky-500 w-full md:w-80 rounded-xl shadow-lg shadow-sky-500 p-4 flex gap-10 flex-col h-auto cursor-pointer">
      {children}
    </div>
  );
});

export default ProductCard;
