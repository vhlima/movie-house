import { useState } from 'react';

import { Form, Formik, FormikHelpers } from 'formik';

import { useMutation } from '@apollo/client';

import { useAuth } from '../../../../../hooks/useAuth';

import type {
  CommentaryInput,
  CommentaryResponse,
} from '../../../../../types/commentary';

import { COMMENT } from '../../../../../graphql/commentary';

import Input from '../../../../../components/Input';

import Button from '../../../../../components/Button';

import SvgIcon from '../../../../../components/SvgIcon';

interface CommentaryFormProps {
  referenceId: string;
  onComment: (commenary: CommentaryResponse) => void;
}

/*
  Commentary form is separated from reviews page beause we dont want to re-render
  main component on every form submit.
*/

const CommentaryForm: React.FC<CommentaryFormProps> = ({
  referenceId,
  onComment,
}) => {
  const { user } = useAuth();

  // TODO user required

  const [commentMutation, { loading }] = useMutation<{
    comment: CommentaryResponse;
  }>(COMMENT);

  const handleComment = async (
    { body }: CommentaryInput,
    helpers: FormikHelpers<CommentaryInput>,
  ) => {
    if (loading) return;

    const { data } = await commentMutation({
      variables: {
        userId: user._id,
        referenceId,
        body,
      },
    });

    if (data) {
      onComment(data.comment);
    }

    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, helpers) => handleComment(values, helpers)}
    >
      <Form className="mt-4">
        <Input
          className="min-h-fit"
          formik
          name="body"
          label={{ text: 'Post a commentary', htmlFor: true }}
        />

        <Button className="mt-2" type="submit" disabled={loading}>
          {!loading ? (
            <span>Comment</span>
          ) : (
            <div className="flex items-center gap-2">
              <SvgIcon
                className="animate-spin"
                iconType="CgSpinner"
                size={22}
              />

              <span>Submitting...</span>
            </div>
          )}
        </Button>
      </Form>
    </Formik>
  );
};

export default CommentaryForm;
