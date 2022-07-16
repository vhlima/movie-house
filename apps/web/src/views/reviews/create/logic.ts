import { useMemo, useState } from 'react';

import * as Yup from 'yup';

import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';

import type { MutationResult } from '@apollo/client';

import type { SchemaOf } from 'yup';

import type { MovieResponse } from '../../../types/movie';

import type { ReviewInput, ReviewResponse } from '../../../types/review';

import type { CreateReviewPageProps } from '../../../pages/reviews/create';

import { useAuth } from '../../../hooks/useAuth';

import { CREATE_REVIEW } from '../../../graphql/review';

type SelectHandles = (movie: MovieResponse) => void;

type SubmitHandles = (values: ReviewInput) => Promise<void>;

interface CreateReviewMutation {
  createReview: ReviewResponse;
}

type ValidationSchemaType = SchemaOf<ReviewInput>;

interface CreateReviewLogicHandles {
  validationSchema: ValidationSchemaType;
  reviewMutationResult: MutationResult<CreateReviewMutation>;

  selectedMovie: MovieResponse;

  isSearch: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  handleSelect: SelectHandles;
  handleSubmit: SubmitHandles;
}

export const useLogic = ({
  movie,
}: CreateReviewPageProps): CreateReviewLogicHandles => {
  const { user } = useAuth();

  const { push } = useRouter();

  const [createReviewMutation, reviewMutationResult] =
    useMutation<CreateReviewMutation>(CREATE_REVIEW);

  const [selectedMovie, setSelectedMovie] = useState<MovieResponse>(movie);

  const [isSearch, setSearch] = useState<boolean>(false);

  const validationSchema: ValidationSchemaType = useMemo(
    () =>
      Yup.object().shape({
        body: Yup.string().required(
          'Please, write your review before submitting',
        ),
      }),
    [],
  );

  const handleSubmit: SubmitHandles = async values => {
    if (!user || !selectedMovie) return;

    const { data } = await createReviewMutation({
      variables: {
        userId: user._id,
        movieId: selectedMovie.id,
        data: values,
      },
    });

    if (data) {
      push({
        pathname: '/reviews/[id]',
        query: { id: data.createReview._id },
      });
    }
  };

  const handleSelect: SelectHandles = mov => {
    reviewMutationResult.reset();

    setSelectedMovie(mov);
    setSearch(false);
  };

  const openSearch = () => {
    setSearch(true);
  };

  const closeSearch = () => {
    setSearch(false);
  };

  return {
    validationSchema,
    reviewMutationResult,

    selectedMovie,

    isSearch,
    openSearch,
    closeSearch,

    handleSelect,
    handleSubmit,
  };
};
