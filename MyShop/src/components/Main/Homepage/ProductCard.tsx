import { memo } from "react";
import { motion } from "framer-motion";

interface PropType {
  children: React.ReactNode;
}

const ProductCard = memo(function ProductCard({ children }: PropType) {
  return (
    <motion.div
      className="group border hover:text-white hover:bg-gradient-to-b hover:from-cyan-400 hover:to-blue-500 hover:dark:from-cyan-600 hover:dark:to-blue-700 dark:border-sky-500 w-full md:w-80 rounded-xl shadow-lg shadow-sky-500 p-4 flex gap-10 flex-col h-auto cursor-pointer"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: -20,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      {children}
    </motion.div>
  );
});

export default ProductCard;
