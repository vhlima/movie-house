import { useField } from 'formik';

import type { RefObject, PropsWithChildren } from 'react';

import RawInput from './Raw';

import type { RawInputProps } from './Raw';

interface InputInternalProps {
  reference?: RefObject<HTMLInputElement>;
  formik?: boolean;
  label?: {
    text: string;
    htmlFor?: boolean;
  };
}

type InputProps = InputInternalProps & RawInputProps;

export const FormikInput: React.FC<InputProps> = ({
  name,
  error,
  reference,
  ...rest
}) => {
  const [field, meta] = useField(name);

  return (
    <RawInput
      ref={reference}
      error={meta.error || error}
      {...rest}
      {...field}
    />
  );
};

// TODO change error to be first element

const Input: React.FC<PropsWithChildren<InputProps>> = ({
  formik,
  label,
  name,
  reference,
  ...rest
}) => {
  const rawInput = !formik ? (
    <RawInput ref={reference} name={name} {...rest} />
  ) : (
    <FormikInput name={name} reference={reference} {...rest} />
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
