import { Form, Formik } from 'formik';

import * as Yup from 'yup';

import type { ModalHandles } from '../../../Modal';

import Modal from '../../../Modal';
import ErrorText from '../../../ErrorText';

import TextInput from '../TextInput';

import { useLogic } from './logic';

interface TextInputModalProps extends ModalHandles {
  rootId: string | number;
}

const TextInputModal: React.FC<TextInputModalProps> = ({ rootId, onClose }) => {
  const validationSchema: Yup.SchemaOf<{ body: string }> = Yup.object().shape({
    body: Yup.string().required('Body is required'),
  });

  const { loading, error, handleSubmit } = useLogic({ rootId });

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
