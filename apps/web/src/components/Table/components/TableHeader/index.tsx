import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface TableHeaderProps {
  className?: string;
}

const TableHeader: React.FC<PropsWithChildren<TableHeaderProps>> = ({
  className,
  children,
}) => (
  <th scope="col" className={clsx('p-4', className && className)}>
    {children}
  </th>
);

export default TableHeader;
