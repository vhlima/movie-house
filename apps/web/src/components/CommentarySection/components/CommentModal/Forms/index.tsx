import { ApolloError } from '@apollo/client';

import { Formik, Form } from 'formik';

import type { FormikHelpers } from 'formik';

import * as Yup from 'yup';

import type { SchemaOf } from 'yup';

import TextInput from '../../TextInput';
import ErrorText from '../../../../ErrorText';

interface FormInput {
  body: string;
}

export interface GenericFormHandles {
  onSubmit: () => void;
}

interface GenericFormProps {
  isReply?: boolean;

  initialValues: FormInput;
  loading?: boolean;
  error: ApolloError;

  onSubmit: (
    values: FormInput,
    formikHelpers: FormikHelpers<FormInput>,
  ) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({
  initialValues,
  error,
  isReply,
  loading,
  onSubmit,
}) => {
  const validationSchema: SchemaOf<FormInput> = Yup.object().shape({
    body: Yup.string().required('Body is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      <Form className="w-full">
        {error && <ErrorText text={error.message} />}

        <TextInput formik loading={loading} isReply={isReply} />
      </Form>
    </Formik>
  );
};

export default GenericForm;
