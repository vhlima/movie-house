import clsx from 'clsx';
import { useState } from 'react';
import Button from '../Button';

import Link from '../Link';
import Typography from '../Typography';
import PaginationButton from './components/PaginationButton';

interface Pagination {
  path:
    | string
    | {
        pathname: string;
        query: Record<string, string>;
      };
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<Pagination> = ({
  path,
  currentPage,
  totalPages,
}) => {
  const a = 1;

  return (
    <nav className="flex items-center justify-between">
      <PaginationButton page={currentPage - 1} totalPages={totalPages}>
        Previous
      </PaginationButton>

      <Typography component="span">
        Page {currentPage} of {totalPages}
      </Typography>

      <PaginationButton page={currentPage + 1} totalPages={totalPages}>
        Next
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
