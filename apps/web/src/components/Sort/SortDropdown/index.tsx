import clsx from 'clsx';

import { useSortLinkBuilder } from '@/hooks/useSortLinkBuilder';

import type { SortLinkBuilderProps } from '@/hooks/useSortLinkBuilder';

import { Link, Typography, SvgIcon } from '@/components';

interface SortDropdownProps extends SortLinkBuilderProps {
  items: Array<{
    id: string;
    name: string;
  }>;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  items,
  ...props
}) => {
  const { selectedOptions, checkIsOptionSelected, buildFilteredHref } =
    useSortLinkBuilder(props);

  return (
    <div className="absolute inset-0 w-full top-full z-10">
      <ul className="bg-grey-800 rounded-b-sm">
        {items.map((item, index) => {
          const isOptionSelected =
            index === 0
              ? selectedOptions.length === 0
              : checkIsOptionSelected(item.id);

          return (
            <li
              className="text-left pr-2 hover:bg-grey-700 first-of-type:border-y first-of-type:border-y-grey-500"
              key={`movie-genre-${item.id}`}
            >
              <Link
                className={clsx('relative pl-6 p-1 block')}
                {...buildFilteredHref(item.id)}
              >
                {index > 0 && isOptionSelected && (
                  <SvgIcon
                    className="absolute left-1 top-2 text-success-base"
                    iconType="FiCheck"
                    size={16}
                  />
                )}

                <Typography
                  className={clsx({
                    'font-bold': isOptionSelected,
                  })}
                  component="span"
                  size="sm"
                >
                  {item.name}
                </Typography>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
