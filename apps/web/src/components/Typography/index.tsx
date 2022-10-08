import clsx from 'clsx';
import type { ElementType, HtmlHTMLAttributes, PropsWithChildren } from 'react';

interface TypographyProps extends HtmlHTMLAttributes<HTMLParagraphElement> {
  component: ElementType;

  /* Style Props */
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  className,
  color = 'secondary',
  size = 'md',
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
        },
        size && {
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

export default Typography;
