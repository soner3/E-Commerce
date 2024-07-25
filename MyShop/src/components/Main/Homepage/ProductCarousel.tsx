import { memo, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Product } from "../../../interfaces";

interface ProductCarouselPropType {
  products: Product[];
}

const ProductCarousel = memo(function ProductCarousel({
  products,
}: ProductCarouselPropType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [{ id: 1 }, { id: 2 }, { id: 3 }];

  function prevSlide() {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  function nextSlide() {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  return (
    <div className="mt-4 md:mx-1 mb-4 lg:mx-20 relative group hover:cursor-pointer">
      <div className="relative w-full overflow-hidden rounded-lg border shadow-lg shadow-sky-500 border-sky-500">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <Link
              to={`product?id=${products[slide.id].id}`}
              key={slide.id}
              className="min-w-full h-64 flex flex-col items-center justify-center text-2xl relative"
            >
              <img
                src={products[slide.id].images[0]}
                alt="Product Picture"
                className="object-cover w-52 relative group-hover:scale-110 duration-300"
              />
              <h2 className="mb-4 text-3xl font-medium">
                {products[slide.id].title}
              </h2>
              <div className="absolute top-10 right-24 lg:right-56 text-white bg-red-500 rounded-full w-24 h-20 p-2 text-center">
                {products[slide.id].discountPercentage}%<br />
                OFF
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-1 transform -translate-y-1/2 text-4xl"
      >
        <BsArrowLeftCircleFill className="text-sky-500 hover:scale-110 duration-300" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-1 transform -translate-y-1/2 text-4xl"
      >
        <BsArrowRightCircleFill className="text-sky-500 hover:scale-110 duration-300" />
      </button>
      <div className="absolute top-5 left-0 bg-red-600 text-center font-bold text-yellow-300 font-serif p-4 text-2xl">
        Limited Time
      </div>
    </div>
  );
});

export default ProductCarousel;
