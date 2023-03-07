import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import Typography from '../Typography';

interface SubHeadingProps {
  title?: string;
  marginBottom?: boolean;
}

const SubHeading: React.FC<PropsWithChildren<SubHeadingProps>> = ({
  title,
  marginBottom = true,
  children,
}) => (
  <div
    className={clsx('flex items-center gap-2 pb-1 border-b border-b-grey-800', {
      'mb-4': marginBottom,
    })}
  >
    {title && (
      <Typography className="uppercase" component="h2" size="sm">
        {title}
      </Typography>
    )}

    {children}
  </div>
);

export default SubHeading;
