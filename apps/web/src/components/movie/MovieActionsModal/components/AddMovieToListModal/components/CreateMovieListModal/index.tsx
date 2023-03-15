import { Form, Formik } from 'formik';

import { Typography, Button, Input, Modal } from '@/components';

import type { ModalHandles } from '@/components';

import { useLogic } from './logic';

import ErrorText from '../../../../../../ErrorText';

type CreateMovieListModalProps = ModalHandles;

const CreateMovieListModal: React.FC<CreateMovieListModalProps> = ({
  onClose,
}) => {
  const { createListResult, validationSchema, handleSubmit } = useLogic();

  const { error } = createListResult;

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
          <Input.Label text="Name" htmlFor="listName">
            <Input.Container styleType="secondary">
              <Input id="listName" />
            </Input.Container>
          </Input.Label>

          <Input.Label text="Description" htmlFor="description">
            <Input.Container styleType="secondary">
              <Input.AutoGrow id="description" />
            </Input.Container>
          </Input.Label>

          <Button className="mt-2" type="submit">
            Create
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateMovieListModal;
