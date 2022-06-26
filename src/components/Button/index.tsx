import React, { PropsWithChildren, ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  background?: boolean;
  rounded?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  rounded = true,
  background = true,
  ...buttonProps
}) => (
  <button
    className={clsx('w-full text-grey-200 p-1', className, {
      'bg-primary': background,
      'rounded-sm': rounded,
    })}
    type="button"
    {...buttonProps}
  >
    {children}
  </button>
);

export default Button;
