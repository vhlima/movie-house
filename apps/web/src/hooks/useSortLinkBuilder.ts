import { useRouter } from 'next/router';

import type { ParsedUrlQuery } from 'querystring';

import type { LinkProps } from '../components/Link';

type SortLinkProps = {
  pathname: string;
  query: Record<string, string | string[] | number | number[]>;
};

export type SortLinkPath = string | SortLinkProps;

export interface SortLinkBuilderProps {
  /* Query key to access from values */
  queryKey: string;

  pathname: {
    /* Clean means the clean (base) path from the list */
    clean: SortLinkPath;

    /* Sort means that we are using this pathname to send our query */
    sort: SortLinkPath;
  };

  /* When true the user can only select one option */
  singleOption?: boolean;
}

const SORT_FILTER_SEPARATE_COMMA = '+';

export function convertStringToMatchParameters(convert: string) {
  return convert.toLowerCase().replace(/ /g, '-');
}

function findQueryValue(
  query: ParsedUrlQuery,
  queryKey: string,
): string | undefined {
  const { sort } = query;

  /* If the query does not contain sort, then we flat search. */
  if (!sort || !Array.isArray(sort)) {
    return query[queryKey] as string;
  }

  /* Check if the parameter is equal to queryKey. */
  const paramIndex = sort.findIndex(param => param === queryKey);

  /* If we dont have any parameter there is no need to sort. */
  if (paramIndex === -1 || sort.length - 1 <= paramIndex) {
    return undefined;
  }

  /*
    Return the next object of sort, considering:
    [..., queryKey, queryValue]

    Example: /users/films/by/decade/2010
    What we will read: [..., 'decade', '2010']
  */

  return sort[paramIndex + 1];
}

export function useSortLinkBuilder({
  pathname,
  queryKey,
  singleOption,
}: SortLinkBuilderProps) {
  const { query } = useRouter();

  const queryKeyValue = findQueryValue(query, queryKey);

  /* Convert queryValue into array of values. */
  const selectedOptions = queryKeyValue
    ? (queryKeyValue as string).split(SORT_FILTER_SEPARATE_COMMA)
    : [];

  function checkIsOptionSelected(rawOptionId: string): boolean {
    return selectedOptions.includes(
      convertStringToMatchParameters(rawOptionId),
    );
  }

  function buildFilteredHref(rawOptionId: string): LinkProps {
    const optionId = convertStringToMatchParameters(rawOptionId);

    const isOptionSelected = selectedOptions.includes(optionId);

    /* If you want the link to reset the sort, just set item.id to -1 */
    if (
      optionId === '-1' ||
      (isOptionSelected && selectedOptions.length <= 1)
    ) {
      const { clean } = pathname;

      const isCleanString = typeof clean === 'string';

      return {
        href: {
          pathname: isCleanString ? clean : clean.pathname,
          query: !isCleanString ? clean.query : undefined,
        },
      };
    }

    /* If the option is selected we remove it. */
    const queryValue = isOptionSelected
      ? selectedOptions.filter(option => option !== optionId)
      : /* If using singleOption never add more than one value to the array. */
        [...(!singleOption ? selectedOptions : []), optionId];

    const { sort } = pathname;

    const isSortString = typeof sort === 'string';

    return {
      href: {
        pathname: isSortString ? sort : sort.pathname,
        query: {
          ...(!isSortString ? sort.query : {}),
          [queryKey]: queryValue.join(SORT_FILTER_SEPARATE_COMMA),
        },
      },
    };
  }

  return {
    selectedOptions,
    checkIsOptionSelected,
    buildFilteredHref,
  };
}
