import React, { useCallback, useEffect, useRef, useState } from 'react';

import { uuid } from 'uuidv4';

import { AiOutlinePlus, AiOutlineStar, AiFillStar } from 'react-icons/ai';

import { FaPlay, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import Image from 'next/image';
import Button from '../Button';
// import TesteCarousel from './teste';

interface MovieProps {
  id: string;
  name: string;
  rating: number;
  coverUrl: string;
}

interface MovieCardProps {
  movie: MovieProps;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <div className="flex flex-col w-44 flex-shrink-0">
    <div className="h-72 relative cursor-pointer transition-transform hover:scale-105">
      <Image layout="fill" objectFit="cover" src={movie.coverUrl} />
    </div>

    <div className="flex flex-col flex-grow gap-2 p-2 rounded-b-md bg-complementaryVariant">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <AiFillStar className="text-yellow-500" size={20} />

          <span className="text-secondary">{movie.rating}</span>
        </div>

        <AiOutlineStar className="text-blue-500" size={20} />
      </div>

      <h1 className="text-secondary">{movie.name}</h1>

      <div className="flex flex-col gap-2 mt-auto">
        <Button className="flex items-center gap-1 w-full text-secondary">
          <AiOutlinePlus size={20} />

          <span>Watchlist</span>
        </Button>

        <Button className="flex items-center gap-1 w-full text-secondary">
          <FaPlay size={20} />

          <span>Trailer</span>
        </Button>
      </div>
    </div>
  </div>
);

interface CarouselPropsProps {
  carouselWidth: number;
  carouselMaxWidth: number;
  carouselChildrens: number;
  childrensWidth: number;
}

const CarouselMovieList: React.FC = () => {
  const movieList: MovieProps[] = [
    {
      id: uuid(),
      name: 'Doctor Strange',
      rating: 8.1,
      coverUrl:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/iM1hlVGZ5Qwn3gO6ewTszY7OrLY.jpg',
    },
    {
      id: uuid(),
      name: 'The Simpsons',
      rating: 7.6,
      coverUrl:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ARIEA8fMTk8HLy8AyLbKyUjsqC.jpg',
    },
    {
      id: uuid(),
      name: 'Megalodon',
      rating: 6.4,
      coverUrl:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hES2eVAbVt08JJTqgu3jmI34Yxx.jpg',
    },
    {
      id: uuid(),
      name: 'Virus Zona de Contenção',
      rating: 4.9,
      coverUrl:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sOIQ8YlLzOeBXtiXhrZwt7nrdi4.jpg',
    },
  ];

  const [carouselProps, setCarouselProps] = useState<CarouselPropsProps>(
    {} as CarouselPropsProps,
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

    const { children } = current;

    const childrensWidth = children.item(0)?.clientWidth || 1;

    setCarouselProps({
      carouselWidth: current.clientWidth,
      carouselMaxWidth: childrensWidth * (children.length - 1),
      carouselChildrens: children.length,
      childrensWidth,
    });
  }, [carouselRef, setCarouselProps]);

  useEffect(() => {
    fetchCarouselProps();
  }, [fetchCarouselProps]);

  return (
    <div className="relative w-full">
      <div
        className="flex gap-4 w-full max-w-full overflow-x-auto scroll-smooth no-scroll"
        ref={carouselRef}
      >
        {movieList.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        <div className="absolute top-1/3 transform translate-y-1/2 flex justify-between max-w-full w-full">
          <button
            className="translate-x-3 py-4 px-2 group border border-white bg-opacity-40 bg-black rounded-md z-50"
            type="button"
            onClick={handleLeft}
          >
            <FaChevronLeft
              className="text-white group-hover:text-yellow-500"
              size={24}
            />
          </button>

          <button
            className="-translate-x-3 py-4 px-2 group border border-white bg-opacity-40 bg-black rounded-md z-50"
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
    </div>
  );
};

export default CarouselMovieList;
