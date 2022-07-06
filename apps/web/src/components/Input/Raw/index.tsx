import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import clsx from 'clsx';

import SvgIcon, { SvgIconType } from '../../SvgIcon';

type InputStyleType = 'primary' | 'secondary';

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

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

type TextareaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;

type AnyAttribute = InputAttributes | TextareaAttributes;

interface RawInputInternalProps {
  name: string;
  hidden?: boolean;
  textarea?: boolean;
  error?: string;
  inputStyle?: InputStyleType;
  inputSize?: 'lg' | 'md' | 'sm';
  rightIcon?: SvgIconType;
  leftIcon?: SvgIconType;
}

export type RawInputProps = RawInputInternalProps & AnyAttribute;

const RawInput: React.FC<RawInputProps> = ({
  className,
  name,
  textarea,
  inputStyle = 'primary',
  inputSize = 'lg',
  rightIcon,
  leftIcon,
  disabled,
  hidden,
  error,
  ...rest
}) => {
  const inputStyleProps = inputStyles[inputStyle];

  const inputClassnames = clsx(
    'w-full bg-transparent outline-none',
    className,
    inputStyleProps.input,
    {
      'cursor-not-allowed': disabled,
      'p-2': inputSize === 'lg',
    },
  );

  return (
    <>
      <div
        className={clsx(
          'flex items-center rounded-md focus-within:outline-none',
          {
            hidden,
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

        {!textarea ? (
          <input
            className={inputClassnames}
            id={name}
            disabled={disabled}
            {...(rest as InputAttributes)}
          />
        ) : (
          <textarea
            className={clsx(inputClassnames, 'resize-none')}
            id={name}
            disabled={disabled}
            {...(rest as TextareaAttributes)}
          />
        )}

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

export default RawInput;
