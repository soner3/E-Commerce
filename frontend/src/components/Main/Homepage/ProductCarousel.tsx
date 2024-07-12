import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useMyShopContext } from "../../../contexts/MyShopContext";

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { state } = useMyShopContext();

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
    <div className="container mt-4 relative">
      <div className="relative w-full overflow-hidden rounded-lg border shadow-lg shadow-sky-500 border-sky-500">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-64 flex flex-col items-center justify-center text-2xl relative"
            >
              <img
                src={state.products[slide.id]?.images[0]}
                alt="Product Picture"
                className="object-cover w-52 relative"
              />
              <h2 className="mb-4 text-3xl font-medium">
                {state.products[slide.id]?.title}
              </h2>
              <div className="absolute top-10 right-24 text-white bg-red-500 rounded-full w-24 h-20 p-2 text-center">
                {state.products[slide.id]?.discountPercentage}%<br />
                OFF
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-1 transform -translate-y-1/2 text-4xl"
      >
        <BsArrowLeftCircleFill className="text-sky-500" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-1 transform -translate-y-1/2 text-4xl"
      >
        <BsArrowRightCircleFill className="text-sky-500" />
      </button>
    </div>
  );
}
