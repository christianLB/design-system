import React, { useState, useRef, useEffect } from 'react';
import { spacing, tokens } from '../tokens';
import { cn } from '../utils';

export interface CarouselProps {
  items: React.ReactNode[];
  itemsToShow: number;
}

export const Carousel: React.FC<CarouselProps> = ({ items, itemsToShow }) => {
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
  const itemsToDisplay = items.length;
  return (
    <div
      className="relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
    >
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ width: `${itemsToDisplay * 100}%` }}
      >
        {items.map((item, index) =>(
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
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
          className={cn(spacing(2), tokens.radius.full, 'disabled:opacity-50')}
          style={{ backgroundColor: tokens.colors.backgroundMuted }}
        >
          {'<'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex >= items.length - itemsToShow}
          aria-label="Next slide"
          className={cn(spacing(2), tokens.radius.full, 'disabled:opacity-50')}
          style={{ backgroundColor: tokens.colors.backgroundMuted }}
        >
          {'>'}
        </button>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 items-center">
        {Array.from({ length: Math.ceil(items.length / itemsToShow) }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(tokens.size.xs, tokens.radius.full, tokens.transition.colors)}
            style={{
              backgroundColor:
                currentIndex === index ? tokens.colors.hover.primary : tokens.colors.border,
            }}
          />
        ))}
      </div>
    </div>
  );
};
