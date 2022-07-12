import { useState } from 'react';

import { Formik, Form } from 'formik';

import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';

import type { NextPage } from 'next';

import type { ReviewData, ReviewResponse } from '../../../types/user';

import type { MovieResponse } from '../../../types/movie';

import { useAuth } from '../../../hooks/useAuth';

import { CREATE_REVIEW } from '../../../graphql/user';

import Card from '../../../components/Card';

import Input from '../../../components/Input';

import Button from '../../../components/Button';

import MovieInfo from '../../../views/movies/components/Info';

import MovieCover from '../../../views/movies/components/Cover';

import MovieSearchModal from '../../../views/movies/components/SearchModal';

const CreateReviewPage: NextPage = () => {
  const { user } = useAuth();

  const { push } = useRouter();

  const [createReviewMutation] = useMutation<{ createReview: ReviewResponse }>(
    CREATE_REVIEW,
  );

  const [selectedMovie, setSelectedMovie] = useState<MovieResponse>();

  const [isSearch, setSearch] = useState<boolean>(false);

  const handleSubmit = async (values: ReviewData) => {
    if (!user) return;

    const reviewResponse = await createReviewMutation({
      variables: {
        userId: user._id,
        movieId: selectedMovie.id,
        ...values,
      },
    });

    if (!reviewResponse.data) return;

    push({
      pathname: '/reviews/[id]',
      query: { id: reviewResponse.data.createReview._id },
    });
  };

  const handleSelect = (movie: MovieResponse) => {
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

      <Card title="Write you review about a movie">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {!selectedMovie ? (
              <>
                <MovieCover coverSize="sm" />

                <div>
                  <h1 className="text-grey-100 text-lg whitespace-nowrap">
                    No movie selected
                  </h1>

                  <p className="text-grey-200">
                    Select the movie you want to review
                  </p>
                </div>
              </>
            ) : (
              <MovieInfo movie={selectedMovie} />
            )}
          </div>

          <Button buttonStyle="secondary" onClick={() => setSearch(true)}>
            Select movie
          </Button>
        </div>

        <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-2">
            <Input
              textarea
              name="body"
              label={{ text: 'Your review:', htmlFor: true }}
            />

            <Button type="submit">Post review</Button>
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default CreateReviewPage;
