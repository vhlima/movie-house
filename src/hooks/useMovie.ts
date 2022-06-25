export interface MovieCategory {
  id: string;
  name: string;
}

type CrewRole = 'Director' | 'Writer';

export interface MovieCrewProps {
  id: string;
  name: string;
  role: CrewRole[];
}

export interface MovieProps {
  id: string;
  name: string;
  spoiler: string;
  duration: string;
  rating: number;
  coverUrl: string;
  backgroundUrl: string;
  ageRestriction: number;
  crew: MovieCrewProps[];
  releaseDate: {
    day: string;
    month: string;
    year: string;
  };
  categories: MovieCategory[];
  cast: Array<{
    id: string;
    role: string;
  }>;
}

interface MovieHookProps {
  movieId: string;
}

/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

export const useMovie = ({ movieId }: MovieHookProps): MovieProps => {
  const movie = {} as MovieProps;

  return movie;
};
