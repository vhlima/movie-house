import React, { PropsWithChildren, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  children,
  ...buttonProps
}) => (
  <button
    className="bg-primary text-complementary rounded-sm p-1"
    type="button"
    {...buttonProps}
  >
    {children}
  </button>
);

export default Button;
