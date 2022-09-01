import clsx from 'clsx';

import { forwardRef, useMemo } from 'react';

import type {
  RefObject,
  InputHTMLAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes,
} from 'react';

import type { InputIconProps } from '../../Icon';

import type { InputStyleType } from './styles';

import InputIcon from '../../Icon';

import { inputStyles } from './styles';

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

type TextareaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;

type InputReferenceType = HTMLInputElement | HTMLTextAreaElement;

// TODO recheck all these props

interface BaseInputInternalProps {
  inputStyle?: InputStyleType;
  inputSize?: 'lg' | 'md' | 'sm';

  name: string;
  error?: string;
  textarea?: boolean;

  styleProps?: {
    hidden?: boolean;
    border?: boolean;
    borderFocus?: boolean;
    showError?: boolean;
    rounded?: boolean;
    roundedTop?: boolean; // TODO remove that
  };

  rightIcon?: InputIconProps;
  leftIcon?: InputIconProps;
}

export type BaseInputProps = BaseInputInternalProps &
  (InputAttributes | TextareaAttributes);

const BaseInput = forwardRef<
  InputReferenceType,
  PropsWithChildren<BaseInputProps>
>(
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
      styleProps,
      children,
      ...rest
    },
    ref,
  ) => {
    const { containerClasses, inputClasses } = useMemo(() => {
      const styles = inputStyles[inputStyle];

      return {
        styles,
        containerClasses: clsx(
          'flex items-center focus-within:outline-none',
          {
            hidden,

            'rounded-t-md': styleProps?.roundedTop,
            'border-none': !styleProps?.border,
            'rounded-md': styleProps?.rounded,

            'w-full border-2': inputSize === 'lg',
          },
          !error
            ? {
                'focus-within:border-movieHouse-mid':
                  styleProps?.border && styleProps?.borderFocus,
              }
            : {
                'border-danger-base': styleProps?.showError,
              },
          !disabled
            ? {
                [styles.container]: true,
                [styles.border]: styleProps?.border,
              }
            : 'bg-grey-900 border-grey-900 bg-opacity-60',
        ),
        inputClasses: clsx(
          'w-full bg-transparent outline-none',
          className,
          styles.input,
          {
            'cursor-not-allowed': disabled,
            'py-2': inputSize === 'lg',
          },
          inputSize === 'lg' && {
            'pr-2': !rightIcon,
            'pl-2': !leftIcon,
          },
        ),
      };
    }, [className, inputSize, inputStyle, rightIcon, leftIcon, styleProps]);

    return (
      <>
        {styleProps?.showError && error && (
          <span className="text-danger-base">{`${error}`}</span>
        )}

        <div className={containerClasses}>
          {children}

          {leftIcon && <InputIcon icon={leftIcon} />}

          {!textarea ? (
            <input
              className={inputClasses}
              ref={ref as RefObject<HTMLInputElement>}
              id={name}
              disabled={disabled}
              {...(rest as InputAttributes)}
            />
          ) : (
            <textarea
              className={clsx(inputClasses, 'resize-none')}
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

export default BaseInput;
