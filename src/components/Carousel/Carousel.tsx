import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '../../utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  itemsToShow: number;
  className?: string;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ items, itemsToShow, className, ...props }, ref) => {
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
        ref={ref} data-testid="carousel" 
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${itemsToDisplay * 100}%` }}
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
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={cn(
              "p-2 rounded-full", 
              "bg-secondary hover:bg-secondary/90 transition-colors",
              "text-secondary-foreground",
              "disabled:opacity-50 disabled:pointer-events-none",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= items.length - itemsToShow}
            className={cn(
              "p-2 rounded-full", 
              "bg-secondary hover:bg-secondary/90 transition-colors",
              "text-secondary-foreground",
              "disabled:opacity-50 disabled:pointer-events-none",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 items-center">
          {Array.from({ length: Math.ceil(items.length / itemsToShow) }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors duration-300",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                currentIndex === index 
                  ? "bg-primary" 
                  : "bg-muted hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export { Carousel };
