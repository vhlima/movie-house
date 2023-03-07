import { Form, Formik } from 'formik';

import { useLogic } from './logic';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ErrorText from '../../../../../components/ErrorText';

interface ReviewCreateFormProps {
  movieId: number;
}

const ReviewCreateForm: React.FC<ReviewCreateFormProps> = ({ movieId }) => {
  const { loading, error, validationSchema, handleSubmit } = useLogic({
    movieId,
  });

  return (
    <Formik
      initialValues={{ content: '' }}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-2 w-full mt-auto">
        {error && <ErrorText text={error.message} />}

        <Input.Label text="Your review:" htmlFor="content">
          <Input.Container>
            <Input.AutoGrow id="content" rows={4} maxHeight={250} />
          </Input.Container>
        </Input.Label>

        {/* <Input
            formik
            name="body"
            rows={4}
            autoGrow={{ maxHeight: 250 }}
            label={{ text: 'Your review:', htmlFor: true }}
          /> */}

        <Button type="submit" disabled={movieId === -1 || loading}>
          Post review
        </Button>
      </Form>
    </Formik>
  );
};

export default ReviewCreateForm;
