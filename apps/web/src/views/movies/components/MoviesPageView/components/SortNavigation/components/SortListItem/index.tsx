import type { PropsWithChildren } from 'react';

const SortListItem: React.FC<PropsWithChildren> = ({ children }) => (
  <li className="bg-grey-800 border-r border-r-grey-700 last:border-r-0">
    {children}
  </li>
);

export default SortListItem;
