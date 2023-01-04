import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

interface PageContentProps {
  className?: string;
}

const PageContent: React.FC<PropsWithChildren<PageContentProps>> = ({
  className,
  children,
}) => (
  <div className={clsx('px-3 md:px-12', className && className)}>
    {children}
  </div>
);

export default PageContent;
