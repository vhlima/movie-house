import React, {
  PropsWithChildren,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import clsx from 'clsx';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface CarouselProps {
  width: number;
  maxWidth: number;
  childrensAmount: number;
  childrensWidth: number;
}

const Carousel: React.FC<PropsWithChildren> = ({ children }) => {
  const [carouselProps, setCarouselProps] = useState<CarouselProps>(
    {} as CarouselProps,
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleRight = () => {
    const { current } = carouselRef;

    if (!current) return;

    current.scrollLeft += carouselProps.childrensWidth;
  };

  const handleLeft = () => {
    const { current } = carouselRef;

    if (!current) return;

    current.scrollLeft -= carouselProps.childrensWidth;
  };

  const fetchCarouselProps = useCallback(() => {
    const { current } = carouselRef;

    if (!current) return;

    const { children: children2 } = current;

    const childrensWidth = children2.item(0)?.clientWidth || 1;

    setCarouselProps({
      width: current.clientWidth,
      maxWidth: childrensWidth * (children2.length - 1),
      childrensAmount: children2.length,
      childrensWidth,
    });
  }, [carouselRef, setCarouselProps]);

  useEffect(() => {
    fetchCarouselProps();
  }, [fetchCarouselProps]);

  const buttonStyles =
    'absolute top-1/2 -translate-y-1/2 py-4 px-2 group border border-white bg-opacity-40 bg-black rounded-md z-50';

  return (
    <div className="relative w-full">
      <div
        className="flex gap-4 w-full max-w-full overflow-x-auto scroll-smooth no-scroll"
        ref={carouselRef}
      >
        {children}

        {/* <div className="absolute top-1/3 transform translate-y-1/2 flex justify-between max-w-full w-full"> */}
        <button
          className={clsx(buttonStyles, 'left-0')}
          type="button"
          onClick={handleLeft}
        >
          <FaChevronLeft
            className="text-white group-hover:text-yellow-500"
            size={24}
          />
        </button>

        <button
          className={clsx(buttonStyles, 'right-0')}
          type="button"
          onClick={handleRight}
        >
          <FaChevronRight
            className="text-white group-hover:text-yellow-500"
            size={24}
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
