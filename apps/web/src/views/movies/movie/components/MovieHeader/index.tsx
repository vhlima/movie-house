import { MovieCover } from '@/components/movie';

import {
  AgeRating,
  DirectorDetails,
  MovieDetails,
  WatchTrailerButton,
} from './components';

interface Props {
  id: number;
  originalTitle: string;
  releaseDate?: string;
  runtime: number;
  posterUrl?: string;
  directedBy?: string;
}

export const MovieHeader: React.FC<Props> = props => {
  const { id, originalTitle, releaseDate, runtime, posterUrl, directedBy } =
    props;

  return (
    <div className="flex justify-between gap-2">
      <div className="flex flex-col w-full z-10">
        <MovieDetails
          originalTitle={originalTitle}
          releaseDate={releaseDate}
          runtime={runtime}
        />

        {directedBy && <DirectorDetails directorName={directedBy} />}

        <div className="flex items-center gap-2 mt-2">
          <WatchTrailerButton id={id} />

          <AgeRating age={18} />
        </div>
      </div>

      <MovieCover
        movie={{
          id,
          originalTitle,
          posterUrl,
        }}
        sizeType="md"
        link={false}
        borderHover={false}
      />
    </div>
  );
};
