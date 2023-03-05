import type { PropsWithChildren } from 'react';

import clsx from 'clsx';
import Button from '../../../Button';

import type { LinkProps } from '../../../Link';

import Link from '../../../Link';

interface PaginationButtonProps {
  // path: LinkProps;
  page: number;
  totalPages: number;
  selected?: boolean;
}

const PaginationButton: React.FC<PropsWithChildren<PaginationButtonProps>> = ({
  page,
  totalPages,
  selected,
  children,
}) => (
  <Button
    className="px-4"
    buttonStyle="secondary"
    full={false}
    disabled={page <= 1 || page === totalPages}
  >
    {children}
  </Button>
);

export default PaginationButton;
