import type { PropsWithChildren } from 'react';

const TableRow: React.FC<PropsWithChildren> = ({ children }) => (
  <tr className="border-b bg-grey-900 border-grey-700 last-of-type:border-b-0">
    {children}
  </tr>
);

export default TableRow;
