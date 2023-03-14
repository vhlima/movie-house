import { Form, Formik } from 'formik';

import * as Yup from 'yup';

import { ApolloError } from '@apollo/client';

import ErrorText from '../../../ErrorText';

import TextInput from '../TextInput';

interface TextInputFormProps {
  rootId: string | number;

  loading: boolean;
  error: ApolloError;
  handleSubmit: (body: string) => Promise<boolean>;
}

const TextInputForm: React.FC<TextInputFormProps> = ({
  rootId,
  loading,
  error,
  handleSubmit,
}) => {
  const validationSchema: Yup.SchemaOf<{ body: string }> = Yup.object().shape({
    body: Yup.string().required().min(1),
  });

  return (
    <Formik
      initialValues={{ body: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values, actions) => {
        await handleSubmit(values.body);
        actions.resetForm();
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
  );
};

export default TextInputForm;
