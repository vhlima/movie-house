import { Form, Formik } from 'formik';

import { useLogic } from './logic';

import { useCreateReview } from '../../hooks/useReviewCreate';

import Input from '../../../../../components/Input';

import Button from '../../../../../components/Button';

import ErrorText from '../../../../../components/ErrorText';

const ReviewCreateForm: React.FC = () => {
  const { userRating, selectedMovie } = useCreateReview();

  const { loading, error, validationSchema, handleSubmit } = useLogic();

  // TODO show form validation errors

  return (
    <Formik
      initialValues={{ body: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-2">
        {error && <ErrorText text={error.message} />}

        <Input
          formik
          name="body"
          rows={4}
          autoGrow={{ maxHeight: 250 }}
          label={{ text: 'Your review:', htmlFor: true }}
        />

        <Button
          type="submit"
          disabled={!selectedMovie || loading || userRating <= 0}
        >
          Post review
        </Button>
      </Form>
    </Formik>
  );
};

export default ReviewCreateForm;
