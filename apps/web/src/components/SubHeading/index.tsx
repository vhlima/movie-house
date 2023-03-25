import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import { Typography } from '@/components';

interface SubHeadingProps {
  className?: string;
  title?: string;
  marginBottom?: boolean;
}

export const SubHeading: React.FC<PropsWithChildren<SubHeadingProps>> = ({
  className,
  title,
  marginBottom,
  children,
}) => (
  <div
    className={clsx(
      'flex gap-2 border-b border-b-grey-800',
      {
        'mb-4': marginBottom,
      },
      className && className,
    )}
  >
    {title && (
      <Typography className="uppercase" component="h2" size="sm">
        {title}
      </Typography>
    )}

    {children}
  </div>
);
