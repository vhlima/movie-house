import { useEffect, useRef } from 'react';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import type { SchemaOf } from 'yup';

import TextInput from '../../TextInput';

interface FormInput {
  body: string;
}

export interface GenericFormHandles {
  onSubmit: () => void;
}

interface GenericFormProps {
  isReply?: boolean;
  loading?: boolean;

  initialValues: FormInput;
  onSubmit: (values: FormInput) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({
  initialValues,
  isReply,
  loading,
  onSubmit,
}) => {
  const validationSchema: SchemaOf<FormInput> = Yup.object().shape({
    body: Yup.string().required('Body is required'),
  });

  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      <Form>
        <TextInput
          formik
          loading={loading}
          isReply={isReply}
          reference={inputRef}
        />
      </Form>
    </Formik>
  );
};

export default GenericForm;
