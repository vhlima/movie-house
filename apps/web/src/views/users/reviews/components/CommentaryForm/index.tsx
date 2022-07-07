import React, { useState } from 'react';

import { Form, Formik, FormikHelpers } from 'formik';

import { CommentaryProps } from '../../../../../types';

import Input from '../../../../../components/Input';

import Button from '../../../../../components/Button';

import SvgIcon from '../../../../../components/SvgIcon';

type CommentaryPropsWithoutId = Omit<CommentaryProps, '_id'>;

interface CommentaryFormProps {
  onSubmit: (values: CommentaryPropsWithoutId) => void;
}

/*
  Commentary form is separated from reviews page beause we dont want to re-render
  main component on every form submit.
*/

const CommentaryForm: React.FC<CommentaryFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const handleComment = async (
    values: CommentaryPropsWithoutId,
    helpers: FormikHelpers<{ message: string }>,
  ) => {
    if (isSubmitting) return;

    setSubmitting(true);

    setTimeout(() => {
      onSubmit(values);

      helpers.resetForm();

      setSubmitting(false);
    }, 2000);
  };

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, helpers) => handleComment(values, helpers)}
    >
      <Form className="mt-4">
        <Input
          formik
          textarea
          name="message"
          inputStyle="secondary"
          label={{ text: 'Post a commentary', htmlFor: true }}
        />

        <Button className="mt-2" type="submit" disabled={isSubmitting}>
          {!isSubmitting ? (
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
