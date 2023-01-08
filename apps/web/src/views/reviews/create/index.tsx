import { useState } from 'react';

import { useCreateReview } from './hooks/useReviewCreate';

import Link from '../../../components/Link';

import Card from '../../../components/Card';

import Button from '../../../components/Button';

import Rating from './components/Rating';

import ReviewCreateForm from './components/Form';

import MovieCover from '../../../components/movie/MovieCover';

import MovieSearchModal from '../../../components/movie/MovieSearchModal';

const CreateReviewView: React.FC = () => {
  const { selectedMovie, setSelectedMovie, setUserRating } = useCreateReview();

  const [isSearch, setSearch] = useState<boolean>(false);

  const handleSelect = movie => {
    // reviewResult.reset();
    setUserRating(0);

    setSelectedMovie(movie);
    setSearch(false);
  };

  return (
    <>
      {isSearch && (
        <MovieSearchModal
          title="Search a movie to review"
          onSelect={handleSelect}
          onClose={() => setSearch(false)}
        />
      )}

      <Card title="Write your review">
        <div className="flex gap-2">
          <MovieCover
            sizeType="sm"
            movie={
              selectedMovie && {
                originalTitle: selectedMovie.originalTitle,
                posterUrl: selectedMovie.posterUrl,
              }
            }
          />

          <div className="flex flex-col gap-2 w-full">
            {!selectedMovie ? (
              <div>
                <h1 className="text-grey-100 text-lg whitespace-nowrap">
                  No movie selected
                </h1>

                <p className="text-grey-200">
                  Select the movie you want to review
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-x-1 flex-wrap">
                  <Link
                    className="text-grey-100 text-xl font-semibold hover:text-grey-300"
                    href="/"
                  >
                    {selectedMovie.originalTitle}
                  </Link>

                  <span className="text-grey-200">
                    ({new Date(selectedMovie.releaseDate).getFullYear()})
                  </span>
                </div>

                <Rating movie={selectedMovie} />
              </div>
            )}
          </div>
        </div>

        <Button
          className="mt-auto"
          buttonStyle="secondary"
          onClick={() => setSearch(true)}
        >
          {!selectedMovie ? 'Select movie' : 'Change movie'}
        </Button>

        <ReviewCreateForm />
      </Card>
    </>
  );
};

export default CreateReviewView;
