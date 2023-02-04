import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface TableDataProps {
  className?: string;
}

const TableData: React.FC<PropsWithChildren<TableDataProps>> = ({
  className,
  children,
}) => (
  <td className={clsx('p-2 lg:p-4', className && className)}>{children}</td>
);

export default TableData;
