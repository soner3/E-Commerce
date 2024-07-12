import { BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";

export default function Rating({ value = 5 }) {
  const arr = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <>
      <div className="flex mb-1 gap-2 text-yellow-300 dark:text-yellow-400">
        {arr.map((number) => {
          return value >= number ? (
            <BsFillStarFill key={number} />
          ) : value >= number - 0.5 ? (
            <BsStarHalf key={number} />
          ) : (
            <BsStar key={number} />
          );
        })}

        {/* {value >= 1 ? (
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
        )} */}
      </div>
      <p className="ml-2 text-lg font-medium">{value}</p>
    </>
  );
}
