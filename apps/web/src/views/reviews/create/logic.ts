import { useMemo, useState } from 'react';

import * as Yup from 'yup';

import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';

import type { MutationResult } from '@apollo/client';

import type { SchemaOf } from 'yup';

import type {
  ReviewInput,
  CreateReviewResponse,
} from '../../../graphql/Review/types';

import type { MovieData } from '../../../graphql/Movie/types';

import { CREATE_REVIEW } from '../../../graphql/Review';

import type { CreateReviewPageProps } from '../../../pages/reviews/create';

import { useAuth } from '../../../hooks/useAuth';

type ReviewFormikInput = Omit<ReviewInput, 'movieId'>;

type SelectHandles = (movie: MovieData) => void;

type SubmitHandles = (values: ReviewFormikInput) => Promise<void>;

type ValidationSchemaType = SchemaOf<ReviewFormikInput>;

interface CreateReviewLogicHandles {
  validationSchema: ValidationSchemaType;

  reviewMutationResult: MutationResult<CreateReviewResponse>;

  selectedMovie: MovieData;

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
    useMutation<CreateReviewResponse>(CREATE_REVIEW);

  const [selectedMovie, setSelectedMovie] = useState<MovieData>(movie);

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
        movieId: selectedMovie.id,
        data: values,
      },
    });

    if (data) {
      push({
        pathname: '/reviews/[id]',
        query: { id: data.createReview.review.id },
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
