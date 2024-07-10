import { BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";

export default function Rating({ value = 5 }) {
  return (
    <>
      <div className="flex mb-1 gap-2 text-yellow-300 dark:text-yellow-400">
        {value >= 1 ? (
          <BsFillStarFill />
        ) : value >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {value >= 2 ? (
          <BsFillStarFill />
        ) : value >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {value >= 3 ? (
          <BsFillStarFill />
        ) : value >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {value >= 4 ? (
          <BsFillStarFill />
        ) : value >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
        {value >= 5 ? (
          <BsFillStarFill />
        ) : value >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </div>
      <p className="ml-2 text-lg font-medium">{value}</p>
    </>
  );
}
