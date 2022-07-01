import React, {
  PropsWithChildren,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import clsx from 'clsx';
import SvgIcon from '../SvgIcon';

interface CarouselStateProps {
  width: number;
  amount: number;
  maxDistance: number;
}

export interface CarouselProps {
  spaceBetween: number;
}

const Carousel: React.FC<PropsWithChildren<CarouselProps>> = ({
  spaceBetween,
  children,
}) => {
  const [carouselProps, setCarouselProps] = useState<CarouselStateProps>(
    {} as CarouselStateProps,
  );

  const [slideNumber, setSlideNumber] = useState<number>(1);

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleDirection = (direction: 'left' | 'right') => {
    const { current } = carouselRef;

    if (!current) return;

    const distance = current.getBoundingClientRect().x;

    const { width } = carouselProps;

    if (direction === 'left') {
      if (slideNumber === 1) return;
      const translateWidth = width + distance;

      current.style.transform = `translateX(${translateWidth}px)`;

      setSlideNumber(prev => prev - 1);
    } else if (direction === 'right') {
      const paddingDifference = slideNumber * spaceBetween;

      const widthDifference = width * slideNumber;

      const translateWidth = -(widthDifference + paddingDifference);

      current.style.transform = `translateX(${translateWidth}px)`;

      setSlideNumber(prev => prev + 1);
    }
  };

  const fetchCarouselProps = useCallback(() => {
    const { current } = carouselRef;

    if (!current) return;

    const { children: carouselChildren } = current;

    const width = carouselChildren.item(0)?.clientWidth || 1;

    const amount = carouselChildren.length;

    const maxDistance = -(width * (amount - 2) + spaceBetween * 2);

    setCarouselProps({
      width,
      amount,
      maxDistance,
    });
  }, [carouselRef, setCarouselProps]);

  useEffect(() => {
    fetchCarouselProps();
  }, [fetchCarouselProps]);

  // const buttonStyles =
  //   'absolute top-1/2 -translate-y-1/2 py-4 px-2 group border border-white bg-opacity-40 bg-black rounded-md z-40';

  const buttonStyles =
    'absolute h-1/2 top-1/2 -translate-y-1/2 p-2 group bg-opacity-40 bg-black rounded-sm z-30';

  console.log(
    `teste? ${carouselRef.current?.getBoundingClientRect().x || 0} | ${
      carouselProps.maxDistance
    }`,
  );

  // right
  // first 12
  // second -176
  // third -364
  // fourth -552
  // MAX -552

  // left
  // fourth -740
  // third -552
  // second -364
  // first -176

  // last returning -740 = 176 + 12

  return (
    <div className="relative w-full">
      <div className="flex gap-3 w-max transition-transform" ref={carouselRef}>
        {children}

        {/* <div className="absolute top-1/3 transform translate-y-1/2 flex justify-between max-w-full w-full"> */}
      </div>

      {slideNumber > 1 && (
        <button
          className={clsx(buttonStyles, '-left-3')}
          type="button"
          onClick={() => handleDirection('left')}
        >
          <SvgIcon
            className="text-white group-hover:text-movieHouse-dark"
            iconType="FaChevronLeft"
            size={24}
          />
        </button>
      )}

      {(carouselRef.current?.getBoundingClientRect().x || 0) >
        carouselProps.maxDistance && (
        <button
          className={clsx(buttonStyles, '-right-3')}
          type="button"
          onClick={() => handleDirection('right')}
        >
          <SvgIcon
            className="text-white group-hover:text-movieHouse-dark"
            iconType="FaChevronRight"
            size={24}
          />
        </button>
      )}
    </div>
  );
};

export default Carousel;
