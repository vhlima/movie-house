import type { PropsWithChildren } from 'react';

import TableData from './components/TableData';
import TableHead from './components/TableHead';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';

interface TableSubComponents {
  Head: typeof TableHead;
  Header: typeof TableHeader;
  Data: typeof TableData;
  Row: typeof TableRow;
}

const Table: React.FC<PropsWithChildren> & TableSubComponents = ({
  children,
}) => (
  <div className="relative overflow-x-auto rounded-sm">
    <table className="w-full text-sm text-center text-grey-200">
      {children}
    </table>
  </div>
);

Table.Head = TableHead;
Table.Header = TableHeader;
Table.Data = TableData;
Table.Row = TableRow;

export default Table;
