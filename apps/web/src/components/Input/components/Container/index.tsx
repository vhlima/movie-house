import clsx from 'clsx';

import { Children } from 'react';

import type { PropsWithChildren } from 'react';

import type { InputStyleType } from './styles';

import { inputStyles } from './styles';

interface InputContainerProps {
  className?: string;
  styleType?: InputStyleType;
  borderFocus?: 'primary' | 'none';
  rounded?: 'lg' | 'md' | 'sm' | 'none';
}

const InputContainer: React.FC<PropsWithChildren<InputContainerProps>> = ({
  className,
  styleType = 'primary',
  rounded = 'md',
  borderFocus = 'primary',
  children,
}) => {
  const childrenCount = Children.count(children);

  return (
    <div
      className={clsx(
        inputStyles[styleType],
        {
          'flex items-center': childrenCount > 1,

          'rounded-lg': rounded === 'lg',
          'rounded-md': rounded === 'md',
          'rounded-sm': rounded === 'sm',

          'focus-within:border-movieHouse-mid': borderFocus === 'primary',
        },
        className && className,
      )}
    >
      {children}
    </div>
  );
};

export default InputContainer;
