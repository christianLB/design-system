import React, { useState, useRef, useEffect, forwardRef } from 'react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  itemsToShow?: number;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ items, itemsToShow = 1, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const totalPages = items.length > 0 ? Math.ceil(items.length / itemsToShow) : 0;

    const handleNext = () => {
      setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
    };

    const handlePrevious = () => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleDotClick = (index: number) => {
      setCurrentIndex(index);
    };

    useEffect(() => {
      if (contentRef.current) {
        const offset = currentIndex * 100;
        contentRef.current.style.transform = `translateX(-${offset}%)`;
      }
    }, [currentIndex]);

    return (
      <div ref={ref} className={`carousel ${className || ''}`} {...props}>
        <div className="carousel__viewport">
          <div ref={contentRef} className="carousel__content">
            {items.map((item, index) => (
              <div
                key={index}
                className="carousel__slide"
                style={{ flex: `0 0 ${100 / itemsToShow}%` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <>
            <div className="carousel__navigation">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="carousel__button carousel__button--prev"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= totalPages - 1}
                className="carousel__button carousel__button--next"
              >
                ›
              </button>
            </div>
            <div className="carousel__pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className={`carousel__dot ${currentIndex === index ? 'carousel__dot--active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export { Carousel };
