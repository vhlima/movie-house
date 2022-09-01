import type { PropsWithChildren } from 'react';

import type { BaseInputProps } from './components/BaseInput';

import type { FormikInputProps } from './components/FormikInput';

import BaseInput from './components/BaseInput';

import FormikInput from './components/FormikInput';

interface InputInternalProps {
  formik?: boolean;
  label?: {
    text: string;
    htmlFor?: boolean;
  };
}

type InputProps = BaseInputProps;

type AnyInputProps = InputInternalProps & (InputProps | FormikInputProps);

const Input: React.FC<PropsWithChildren<AnyInputProps>> = ({
  formik,
  label,
  name,
  ...rest
}) => {
  const rawInput = !formik ? (
    <BaseInput name={name} {...rest} />
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
