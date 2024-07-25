import { memo } from "react";
import { BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";

interface RatingProps {
  value?: number;
  showValue?: boolean;
}

const Rating = memo(function Rating({
  value = 5,
  showValue = true,
}: RatingProps) {
  const arr = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <>
      <div className="flex mb-1 gap-2 text-yellow-300 dark:text-yellow-400">
        {arr.map((number) => {
          if (value >= number) {
            return <BsFillStarFill key={number} />;
          } else if (value >= number - 0.5) {
            return <BsStarHalf key={number} />;
          } else {
            return <BsStar key={number} />;
          }
        })}
      </div>
      {showValue && <p className="ml-2 text-lg font-medium">{value}</p>}
    </>
  );
});

export default Rating;
