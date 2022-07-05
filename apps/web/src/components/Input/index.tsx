import React, { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import { useField } from 'formik';

import SvgIcon, { SvgIconType } from '../SvgIcon';

type InputStyleType = 'primary' | 'secondary';

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  inputStyle?: InputStyleType;
  inputSize?: 'lg' | 'md' | 'sm';
  rightIcon?: SvgIconType;
  leftIcon?: SvgIconType;
}

interface InputProps extends SimpleInputProps {
  formik?: boolean;
}

interface InputStyleProps {
  container: string;
  input: string;
}

const inputStyles: {
  [key in InputStyleType]: InputStyleProps;
} = {
  primary: {
    container: 'bg-grey-900 border-grey-900',
    input: 'text-white placeholder-grey-400',
  },
  secondary: {
    container: 'bg-grey-900 border-grey-900',
    input: 'text-white placeholder-grey-400',
  },
};

const SimpleInput: React.FC<SimpleInputProps> = ({
  className,
  name,
  error,
  inputStyle = 'primary',
  inputSize = 'lg',
  rightIcon,
  leftIcon,
  disabled,
  ...rest
}) => {
  const inputStyleProps = inputStyles[inputStyle];

  return (
    <>
      <div
        className={clsx(
          'flex items-center rounded-md focus-within:outline-none',
          {
            [inputStyleProps.container]: !disabled,
            'focus-within:border-movieHouse-mid': !error,
            'border-danger-base': error,
            'bg-grey-900 border-grey-900 bg-opacity-60': disabled,
            'w-full border-2': inputSize === 'lg',
          },
        )}
      >
        {leftIcon && (
          <div className="p-2 pr-0">
            <SvgIcon className="text-grey-500" iconType={leftIcon} size={20} />
          </div>
        )}

        <input
          className={clsx(
            'w-full bg-transparent outline-none',
            className,
            inputStyleProps.input,
            {
              'cursor-not-allowed': disabled,
              'p-2': inputSize === 'lg',
            },
          )}
          id={name}
          disabled={disabled}
          {...rest}
        />

        {rightIcon && (
          <div className="p-2 pl-0">
            <SvgIcon className="text-grey-500" iconType={rightIcon} size={20} />
          </div>
        )}
      </div>

      {error && <span className="text-danger-base">{`${error}`}</span>}
    </>
  );
};

export const FormikInput: React.FC<SimpleInputProps> = ({ name, ...rest }) => {
  const [field, meta] = useField(name);

  return <SimpleInput error={meta.error} {...rest} {...field} />;
};

const Input: React.FC<InputProps> = ({ formik, ...rest }) =>
  !formik ? <SimpleInput {...rest} /> : <FormikInput {...rest} />;

export default Input;
