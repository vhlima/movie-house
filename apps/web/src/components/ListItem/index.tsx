import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface ListItemProps {
  className?: string;
}

/* 
  This component will be used whenever we need a list with border and spacing
*/

const ListItem: React.FC<PropsWithChildren<ListItemProps>> = ({
  className,
  children,
}) => (
  <li
    className={clsx(
      'py-4 first-of-type:pt-0 last-of-type:pb-0 border-b border-b-grey-800 last-of-type:border-b-0',
      className,
    )}
  >
    {children}
  </li>
);

export default ListItem;
