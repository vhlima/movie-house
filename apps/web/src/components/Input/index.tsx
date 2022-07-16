import React from 'react';

import { useField } from 'formik';

import RawInput, { RawInputProps } from './Raw';

interface InputInternalProps {
  formik?: boolean;
  label?: {
    text: string;
    htmlFor?: boolean;
  };
}

type InputProps = InputInternalProps & RawInputProps;

export const FormikInput: React.FC<InputProps> = ({ name, error, ...rest }) => {
  const [field, meta] = useField(name);

  return <RawInput error={meta.error || error} {...rest} {...field} />;
};

// TODO change error to be first element

const Input: React.FC<InputProps> = ({ formik, label, name, ...rest }) => {
  const rawInput = !formik ? (
    <RawInput name={name} {...rest} />
  ) : (
    <FormikInput name={name} {...rest} />
  );

  return !label ? (
    rawInput
  ) : (
    <div className="flex flex-col gap-1">
      {!label.htmlFor ? (
        <span className="text-grey-200 font-semibold">{label.text}</span>
      ) : (
        <label className="text-grey-200 font-semibold" htmlFor={name}>
          {label.text}
        </label>
      )}

      {rawInput}
    </div>
  );
};

export default Input;
