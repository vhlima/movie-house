import * as Yup from 'yup';

import { useRouter } from 'next/router';

import type { SchemaOf } from 'yup';

import type { CreateReviewMutationVariables } from '@/graphql';

import { useCreateReviewMutation } from '@/graphql';

type ReviewFormikInput = Omit<CreateReviewMutationVariables, 'movieId'>;

type ValidationSchemaType = SchemaOf<ReviewFormikInput>;

interface CreateReviewLogicProps {
  movieId: number;
}

const validationSchema: ValidationSchemaType = Yup.object().shape({
  content: Yup.string().required('Write your review before submitting.'),
});

export const useLogic = ({ movieId }: CreateReviewLogicProps) => {
  const { push } = useRouter();

  const [createReviewMutation, reviewResult] = useCreateReviewMutation({
    errorPolicy: 'all',
  });

  const handleSubmit = async (values: ReviewFormikInput) => {
    if (movieId === -1) return;

    const { data } = await createReviewMutation({
      variables: {
        movieId,
        content: values.content,
      },
    });

    if (data) {
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
