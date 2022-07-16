import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

interface PageBodyProps {
  className?: string;
}

const PageBody: React.FC<PropsWithChildren<PageBodyProps>> = ({
  className,
  children,
}) => <div className={clsx('p-3', className && className)}>{children}</div>;

export default PageBody;
