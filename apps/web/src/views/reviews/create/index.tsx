import { useState } from 'react';

import type { Movie } from '../../../graphql';

import Card from '../../../components/Card';
import Typography from '../../../components/Typography';
import MovieCover from '../../../components/movie/MovieCover';

import ReviewCreateForm from './components/ReviewCreateForm';
import MovieSearchButton from './components/MovieSearchButton';

type CardReviewMovieType = {
  id: Movie['id'];
  posterUrl: Movie['posterUrl'];
  releaseDate?: Movie['releaseDate'];
  originalTitle: Movie['originalTitle'];
};

interface CreateReviewView {
  movie: CardReviewMovieType;
}

const CreateReviewView: React.FC<CreateReviewView> = ({ movie }) => {
  const [selectedMovie, setSelectedMovie] =
    useState<CardReviewMovieType>(movie);

  return (
    <Card title="Write your review">
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          {!selectedMovie && (
            <div>
              <Typography
                className="whitespace-nowrap font-bold"
                component="h2"
                color="primary"
                size="lg"
              >
                No movie selected
              </Typography>

              <Typography component="p">
                Select the movie you want to review.
              </Typography>
            </div>
          )}

          <MovieCover sizeType="md" movie={selectedMovie} link={false} />

          <MovieSearchButton
            className="whitespace-nowrap"
            onSearchResult={movie => setSelectedMovie(movie)}
          >
            {!selectedMovie ? 'Select movie' : 'Change movie'}
          </MovieSearchButton>
        </div>

        <ReviewCreateForm movieId={selectedMovie ? selectedMovie.id : -1} />
      </div>
    </Card>
  );
};

export default CreateReviewView;
