import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

interface PageContentProps {
  className?: string;
}

const PageContent: React.FC<PropsWithChildren<PageContentProps>> = ({
  className,
  children,
}) => <div className={clsx('p-3', className && className)}>{children}</div>;

export default PageContent;
