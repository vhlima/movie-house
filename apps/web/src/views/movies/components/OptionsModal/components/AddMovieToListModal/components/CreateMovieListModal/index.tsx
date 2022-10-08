import { Form, Formik } from 'formik';

import type { ModalHandles } from '../../../../../../../../components/Modal';

import { useLogic } from './logic';

import Modal from '../../../../../../../../components/Modal';

import Input from '../../../../../../../../components/Input';

import Button from '../../../../../../../../components/Button';

import Typography from '../../../../../../../../components/Typography';
import ErrorText from '../../../../../../../../components/ErrorText';

type CreateMovieListModalProps = ModalHandles;

const CreateMovieListModal: React.FC<CreateMovieListModalProps> = ({
  onClose,
}) => {
  const {
    createUserListResult: { loading, error },
    validationSchema,
    handleSubmit,
  } = useLogic({
    onClose,
  });

  return (
    <Modal center backdrop onClose={onClose}>
      <Typography
        className="font-bold mb-2"
        component="h1"
        color="primary"
        size="xl"
      >
        Create movie list
      </Typography>

      {error && (
        <div className="mb-2">
          <ErrorText text={`Error creating movie list: ${error.message}`} />
        </div>
      )}

      <Formik
        initialValues={{ listName: '', description: undefined }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input
            formik
            name="listName"
            inputStyle="secondary"
            label={{
              text: 'Name',
              htmlFor: true,
            }}
          />

          <Input
            formik
            autoGrow={{ maxHeight: 250 }}
            name="description"
            inputStyle="secondary"
            label={{
              text: 'Description',
              htmlFor: true,
            }}
          />

          <Button className="mt-2" type="submit" disabled={loading}>
            Create
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateMovieListModal;
