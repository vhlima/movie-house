import { Form, Formik } from 'formik';

import * as Yup from 'yup';

import { ApolloError } from '@apollo/client';

import type { ModalHandles } from '../../../Modal';

import Modal from '../../../Modal';
import ErrorText from '../../../ErrorText';

import TextInput from '../TextInput';

interface TextInputModalProps extends ModalHandles {
  rootId: string | number;

  loading: boolean;
  error: ApolloError;
  handleSubmit: (body: string) => Promise<boolean>;
}

const TextInputModal: React.FC<TextInputModalProps> = ({
  rootId,
  loading,
  error,
  handleSubmit,
  onClose,
}) => {
  const validationSchema: Yup.SchemaOf<{ body: string }> = Yup.object().shape({
    body: Yup.string().required('Body is required'),
  });

  return (
    <Modal backdrop center autoStyle={false} onClose={onClose}>
      <Formik
        initialValues={{ body: '' }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async values => {
          const success = await handleSubmit(values.body);

          if (success) {
            onClose();
          }
        }}
      >
        <Form className="w-full">
          {error && <ErrorText text={error.message} />}

          <TextInput
            formik
            loading={loading}
            isReply={typeof rootId === 'string'}
          />
        </Form>
      </Formik>
    </Modal>
  );
};

export default TextInputModal;
