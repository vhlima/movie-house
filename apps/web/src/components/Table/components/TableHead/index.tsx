import type { PropsWithChildren } from 'react';

const TableHead: React.FC<PropsWithChildren> = ({ children }) => (
  <thead className="text-xs uppercase bg-grey-700 text-grey-200">
    {children}
  </thead>
);

export default TableHead;
