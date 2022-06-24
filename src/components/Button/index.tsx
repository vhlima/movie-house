import React, { PropsWithChildren, ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  ...buttonProps
}) => (
  <button
    className={clsx('bg-primary text-complementary rounded-sm p-1', className)}
    type="button"
    {...buttonProps}
  >
    {children}
  </button>
);

export default Button;
