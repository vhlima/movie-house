import clsx from 'clsx';
import type { ElementType, HtmlHTMLAttributes, PropsWithChildren } from 'react';

interface TypographyProps extends HtmlHTMLAttributes<HTMLParagraphElement> {
  component: ElementType;

  /* Style Props */
  hover?: boolean;
  groupHover?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'error';
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

export const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  className,
  color = 'secondary',
  size = 'md',
  hover,
  groupHover,
  component,
  children,
  ...rest
}) => {
  const ElementComponent = component;

  return (
    <ElementComponent
      className={clsx(
        color && {
          'text-grey-100': color === 'primary',
          'text-grey-200': color === 'secondary',
          'text-grey-300': color === 'tertiary',
          'text-grey-500': color === 'quaternary',
          'text-error-mid': color === 'error',
        },
        hover && {
          'hover:text-grey-200': color === 'primary',
          'hover:text-grey-300': color === 'secondary',
          'hover:text-grey-400': color === 'tertiary',
          'hover:text-grey-500': color === 'quaternary',
          'hover:text-error-light': color === 'error',
        },
        groupHover && {
          'group-hover:text-grey-200': color === 'primary',
          'group-hover:text-grey-300': color === 'secondary',
          'group-hover:text-grey-400': color === 'tertiary',
          'group-hover:text-grey-500': color === 'quaternary',
          'group-hover:text-error-light': color === 'error',
        },
        size && {
          'text-4xl': size === '4xl',
          'text-3xl': size === '3xl',
          'text-2xl': size === '2xl',
          'text-xl': size === 'xl',
          'text-lg': size === 'lg',
          'text-md': size === 'md',
          'text-sm': size === 'sm',
          'text-xs': size === 'xs',
        },
        className && className,
      )}
      {...rest}
    >
      {children}
    </ElementComponent>
  );
};
