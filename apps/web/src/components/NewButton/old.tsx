import clsx from 'clsx';

import { useMemo } from 'react';

import type { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import ButtonOrLink from '.';

type ButtonStyleType = 'primary' | 'secondary' | 'tertiary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  buttonStyle?: ButtonStyleType;
  buttonSize?: 'lg' | 'md' | 'sm' | 'xs' | 'none';
  full?: boolean;
  flex?: boolean; // TODO Change that prop to center
  border?: boolean;
  rounded?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  full = true,
  flex = true,
  rounded = true,
  border = true,
  buttonStyle = 'primary',
  buttonSize = 'sm',
  disabled,
  children,
  ...buttonProps
}) => {
  <ButtonOrLink type="submit" />;
};

export default Button;
