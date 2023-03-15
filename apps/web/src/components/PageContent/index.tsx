import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

interface PageContentProps {
  className?: string;
}

export const PageContent: React.FC<PropsWithChildren<PageContentProps>> = ({
  className,
  children,
}) => (
  <div className={clsx('px-2 md:px-4', className && className)}>{children}</div>
);
