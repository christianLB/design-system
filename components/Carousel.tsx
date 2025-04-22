import React, { useState, useRef, useEffect } from 'react';

interface CarouselProps {
  items: React.ReactNode[];
  itemsToShow: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, itemsToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - itemsToShow));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${currentIndex * (100 / itemsToShow)}%)`;
    }
  }, [currentIndex, itemsToShow]);
  return (
    <div className="relative overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ width: `${items.length * (100 / itemsToShow)}%` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${100 / itemsToShow}%` }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
        >
          {'<'}
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= items.length - itemsToShow}
          className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
        >
          {'>'}
        </button>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(items.length / itemsToShow) }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;