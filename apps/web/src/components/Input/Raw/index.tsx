import clsx from 'clsx';

import { forwardRef, RefObject } from 'react';

import type {
  InputHTMLAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes,
} from 'react';

import InputIcon from '../Icon';

import type { InputIconProps } from '../Icon';

type InputStyleType = 'primary' | 'secondary';

interface InputStyleProps {
  container: string;
  border: string;
  input: string;
}

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

type TextareaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;

type AnyAttribute = InputAttributes | TextareaAttributes;

export type InputReferenceType = HTMLInputElement | HTMLTextAreaElement;

// TODO recheck all these props

interface RawInputInternalProps {
  name: string;
  hidden?: boolean;
  textarea?: boolean;
  error?: string;
  showError?: boolean;
  border?: boolean;
  borderFocus?: boolean;
  rounded?: boolean;
  roundedTop?: boolean; // TODO remove that
  inputStyle?: InputStyleType;
  inputSize?: 'lg' | 'md' | 'sm';
  rightIcon?: InputIconProps;
  leftIcon?: InputIconProps;
}

export type RawInputProps = PropsWithChildren<
  RawInputInternalProps & AnyAttribute
>;

// TODO remove border from input styles

const inputStyles: {
  [key in InputStyleType]: InputStyleProps;
} = {
  primary: {
    container: 'bg-grey-800 border-grey-800',
    border: 'border-grey-800',
    input: 'text-white placeholder-grey-400',
  },
  secondary: {
    container: 'bg-grey-900',
    border: 'border-grey-900',
    input: 'text-white placeholder-grey-400',
  },
};

// TODO multiple forward refs, ref drilling

const RawInput = forwardRef<InputReferenceType, RawInputProps>(
  (
    {
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
      showError = true,
      rounded = true,
      border = true,
      borderFocus = true,
      roundedTop,
      children,
      ...rest
    },
    ref,
  ) => {
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
        {showError && error && (
          <span className="text-danger-base">{`${error}`}</span>
        )}

        <div
          className={clsx('flex items-center focus-within:outline-none', {
            hidden,
            [inputStyleProps.container]: !disabled,
            [inputStyleProps.border]: !disabled && border,
            'border-none': !border,
            'rounded-md': rounded,
            'focus-within:border-movieHouse-mid':
              border && borderFocus && !error,
            'border-danger-base': showError && error,
            'bg-grey-900 border-grey-900 bg-opacity-60': disabled,
            'w-full border-2': inputSize === 'lg',
            'rounded-t-md': roundedTop,
          })}
        >
          {children}

          {leftIcon && <InputIcon icon={leftIcon} />}

          {!textarea ? (
            <input
              className={inputClassnames}
              ref={ref as RefObject<HTMLInputElement>}
              id={name}
              disabled={disabled}
              {...(rest as InputAttributes)}
            />
          ) : (
            <textarea
              className={clsx(inputClassnames, 'resize-none')}
              ref={ref as RefObject<HTMLTextAreaElement>}
              id={name}
              disabled={disabled}
              {...(rest as TextareaAttributes)}
            />
          )}

          {rightIcon && <InputIcon icon={rightIcon} />}
        </div>
      </>
    );
  },
);

export default RawInput;
