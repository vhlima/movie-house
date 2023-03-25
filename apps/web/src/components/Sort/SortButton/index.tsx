import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSingleDropdown } from '@/hooks/useSingleDropdown';

import { Typography, SvgIcon } from '@/components';

export type SortButtonIntent = 'primary' | 'secondary';

type SortButtonType = 'decade' | 'genre' | 'service' | string;

type SortButtonSize = 'lg' | 'md' | 'sm';

interface SortButtonProps {
  type?: SortButtonType;
  text?: string;
  intent?: SortButtonIntent;
}

// TODO(BUG): When you fast click on the button the request
// to fetch the list is send but the response is not received
// because the component isn't being rendered.

const buttonSizes: { [key in SortButtonSize]: string } = {
  lg: 'px-9',
  md: 'px-6',
  sm: 'px-2',
};

const buttonTexts: { [key in SortButtonType]: string } = {
  decade: 'Decade',
  genre: 'Genre',
  service: 'Service',
};

export const SortButton: React.FC<PropsWithChildren<SortButtonProps>> = ({
  type,
  intent = 'primary',
  text = buttonTexts[type],
  children,
}) => {
  const { elementRef, handleBlur } = useOutsideClick<HTMLDivElement>();

  const { dropdownOpen, openDropdown, closeDropdown } = useSingleDropdown();

  const isOpen = type === dropdownOpen;

  return (
    <div
      className={clsx('relative flex items-center gap-1 w-full py-1 ', {
        'border-r border-r-grey-700 last:border-r-0': intent === 'primary',
        'bg-grey-800':
          intent === 'primary' || (isOpen && intent === 'secondary'),
        'rounded-t-sm': isOpen,
        [buttonSizes.sm]: type && type === 'decade',
        [buttonSizes.md]: !type || type !== 'decade',
      })}
      ref={elementRef}
      onBlur={e => handleBlur(e, closeDropdown)}
    >
      <button
        className="w-full flex items-center justify-center"
        type="button"
        onClick={() => openDropdown(type)}
      >
        <Typography className="uppercase" component="span" size="sm">
          {text}
        </Typography>

        <SvgIcon className="ml-2" iconType="FaChevronDown" />
      </button>

      {isOpen && children}
    </div>
  );
};
