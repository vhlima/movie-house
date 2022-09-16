import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface ListItemProps {
  className?: string;
  border?: boolean;
}

/* 
  This component will be used when we need a list with border spacing
  Ex: Lists of MovieReview (preview) or MovieList (preview)
*/

const ListItem: React.FC<PropsWithChildren<ListItemProps>> = ({
  className,
  border = true,
  children,
}) => (
  <li
    className={clsx('py-4 first-of-type:pt-0 last-of-type:pb-0', className, {
      'border-b border-b-grey-300 last-of-type:border-b-0': border,
    })}
  >
    {children}
  </li>
);

export default ListItem;
