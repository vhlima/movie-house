import React, { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import { useField } from 'formik';

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

interface InputProps extends SimpleInputProps {
  formik?: boolean;
}

const SimpleInput: React.FC<SimpleInputProps> = ({
  className,
  name,
  ...rest
}) => (
  <div className="w-full rounded-sm border border-gray-300 overflow-hidden">
    <input
      className={clsx('w-full p-2 bg-white outline-none', className)}
      id={name}
      {...rest}
    />
  </div>
);

export const FormikInput: React.FC<SimpleInputProps> = ({ name, ...rest }) => {
  const [field] = useField(name);

  return <SimpleInput {...rest} {...field} />;
};

const Input: React.FC<InputProps> = ({ formik, ...rest }) =>
  !formik ? <SimpleInput {...rest} /> : <FormikInput {...rest} />;

export default Input;
