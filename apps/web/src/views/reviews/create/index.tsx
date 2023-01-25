import { useState } from 'react';

import type { Movie } from '../../../graphql';

import Card from '../../../components/Card';
import MovieCover from '../../../components/movie/MovieCover';

import ReviewCreateForm from './components/ReviewCreateForm';
import MovieSearchButton from './components/MovieSearchButton';
import MovieSelectionInfo from './components/MovieSelectionInfo';

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
      <div className="flex gap-2">
        <MovieCover sizeType="sm" movie={selectedMovie} />

        <MovieSelectionInfo movie={selectedMovie} />
      </div>

      <MovieSearchButton onSearchResult={movie => setSelectedMovie(movie)}>
        {!selectedMovie ? 'Select movie' : 'Change movie'}
      </MovieSearchButton>

      <ReviewCreateForm movieId={selectedMovie ? selectedMovie.id : -1} />
    </Card>
  );
};

export default CreateReviewView;
