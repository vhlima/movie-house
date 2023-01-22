import { Form, Formik } from 'formik';

import type { ModalHandles } from '../../../../../../Modal';

import { useLogic } from './logic';

import Modal from '../../../../../../Modal';

import Input from '../../../../../../Input';

import Button from '../../../../../../Button';

import Typography from '../../../../../../Typography';

import ErrorText from '../../../../../../ErrorText';

type CreateMovieListModalProps = ModalHandles;

const CreateMovieListModal: React.FC<CreateMovieListModalProps> = ({
  onClose,
}) => {
  const { createUserListResult, validationSchema, handleSubmit } = useLogic();

  const { error } = createUserListResult;

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text="Create movie list" />

        <Typography component="h2">
          Create your own list and add movies to it.
        </Typography>

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      {error && (
        <div className="mb-2">
          <ErrorText text={error.message} />
        </div>
      )}

      <Formik
        initialValues={{ listName: '', description: undefined }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={async values => {
          const success = await handleSubmit(values);

          if (success) {
            onClose();
          }
        }}
      >
        <Form className="flex flex-col gap-2">
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
            textarea
            autoGrow={{ maxHeight: 250 }}
            name="description"
            inputStyle="secondary"
            label={{
              text: 'Description',
              htmlFor: true,
            }}
          />

          <Button className="mt-2" type="submit">
            Create
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateMovieListModal;
