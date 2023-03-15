import { useRouter } from 'next/router';
import { Typography, Button } from '@/components';

interface Pagination {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<Pagination> = ({
  currentPage,
  totalPages,
}) => {
  const { push, pathname, query } = useRouter();

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;

    push({
      pathname,
      query: { ...query, page },
    });
  }

  return (
    <nav className="flex flex-col gap-4 items-center justify-between sm:flex-row sm:gap-0">
      <Button
        className="w-full sm:w-40"
        intent="secondary"
        full={false}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <Typography component="span">
        Page {currentPage} of {totalPages}
      </Typography>

      <Button
        className="w-full sm:w-40"
        intent="secondary"
        full={false}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
};
