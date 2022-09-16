import { useMemo } from 'react';

import * as Yup from 'yup';

import { ApolloError } from '@apollo/client';

import { useRouter } from 'next/router';

import type { SchemaOf } from 'yup';

import type { CreateReviewMutationVariables } from '../../../../../graphql';

import { useCreateReviewMutation } from '../../../../../graphql';

import { useCreateReview } from '../../hooks/useReviewCreate';

type ReviewFormikInput = Omit<CreateReviewMutationVariables, 'movieId'>;

type SubmitHandles = (values: ReviewFormikInput) => Promise<void>;

type ValidationSchemaType = SchemaOf<ReviewFormikInput>;

interface CreateReviewLogicHandles {
  validationSchema: ValidationSchemaType;

  loading: boolean;
  error?: ApolloError;

  handleSubmit: SubmitHandles;
}

export const useLogic = (): CreateReviewLogicHandles => {
  const { selectedMovie } = useCreateReview();

  const { push } = useRouter();

  const [createReviewMutation, reviewResult] = useCreateReviewMutation();

  const validationSchema: ValidationSchemaType = useMemo(
    () =>
      Yup.object().shape({
        body: Yup.string().required('Write your review before submitting'),
      }),
    [],
  );

  const handleSubmit: SubmitHandles = async values => {
    if (!selectedMovie) return;

    const { data, errors } = await createReviewMutation({
      variables: {
        movieId: selectedMovie.id,
        body: values.body,
      },
    });

    if (!errors && data) {
      // TODO fix that push
      await push({
        pathname: '/reviews/[id]',
        query: { id: data.createReview.id },
      });
    }
  };

  return {
    validationSchema,

    loading: reviewResult.loading,
    error: reviewResult.error,

    handleSubmit,
  };
};
