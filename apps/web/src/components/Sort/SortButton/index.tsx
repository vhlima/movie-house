import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';

import { Typography, SvgIcon } from '@/components';

export type SortButtonIntent = 'primary' | 'secondary';

interface SortButtonProps {
  className?: string;
  text: string;
  intent?: SortButtonIntent;
  sizeType?: 'sm' | 'md' | 'lg' | 'none';
  isOpen?: boolean;
  onClick: () => void;
  onClose: () => void;
}

// TODO(BUG): When you fast click on the button the request
// to fetch the list is send but the response is not received
// because the component isn't being rendered.

const SortButton: React.FC<PropsWithChildren<SortButtonProps>> = ({
  className,
  intent = 'primary',
  sizeType,
  text,
  isOpen,
  children,
  onClick,
  onClose,
}) => {
  const { elementRef, handleBlur } = useOutsideClick<HTMLDivElement>();

  return (
    <div
      className={clsx(
        'relative flex items-center gap-1 w-full px-4 lg:px-3 py-0.5',
        {
          'w-36 sm:w-28': sizeType && sizeType === 'sm',
          'w-36 sm:w-32': sizeType && sizeType === 'md',
          'w-36 sm:w-36': sizeType && sizeType === 'lg',
          'bg-grey-800':
            intent === 'primary' || (isOpen && intent === 'secondary'),
          'rounded-t-sm': isOpen,
        },
        className && className,
      )}
      ref={elementRef}
      onBlur={e => handleBlur(e, onClose)}
    >
      <button
        className="w-full flex items-center justify-center"
        type="button"
        onClick={onClick}
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

export default SortButton;
