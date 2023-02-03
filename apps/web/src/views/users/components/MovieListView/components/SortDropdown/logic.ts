import { useRouter } from 'next/router';

import type { LinkProps } from '../../../../../../components/Link';

export interface SortDropdownLogicProps {
  /* Query key to access from values */
  queryKey: string;

  /* When true the user can only select one option */
  singleOption?: boolean;

  pathname: {
    /* Sort means that we are using this pathname to send our query */
    sort: string;

    /* Clean means the clean (base) path from the list */
    clean: string;
  };
}

export function useLogic({
  pathname,
  queryKey,
  singleOption,
}: SortDropdownLogicProps) {
  const { query } = useRouter();

  const selectedOptions = query[queryKey]
    ? (query[queryKey] as string).split(',')
    : [];

  function buildGenreUrl(optionId: string): LinkProps {
    if (optionId === '-1') {
      return {
        href: {
          pathname: pathname.clean,
          query: { username: query.username },
        },
      };
    }

    const isOptionSelected = selectedOptions.includes(optionId);

    if (isOptionSelected && selectedOptions.length <= 1) {
      return {
        href: {
          pathname: pathname.clean,
          query: { username: query.username },
        },
      };
    }

    return {
      href: {
        pathname: pathname.sort,
        query: {
          username: 'vhlima',
          [queryKey]: isOptionSelected
            ? selectedOptions.filter(genre => genre !== optionId).join(',')
            : [...(!singleOption ? selectedOptions : []), optionId].join(','),
        },
      },
    };
  }

  return {
    selectedOptions,
    buildGenreUrl,
  };
}
