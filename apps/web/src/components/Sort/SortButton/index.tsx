import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import { useOutsideClick } from '../../../hooks/useOutsideClick';

import SvgIcon from '../../SvgIcon';
import Typography from '../../Typography';

interface SortButtonProps {
  text: string;
  sizeType?: 'sm' | 'md' | 'lg';
  isOpen?: boolean;
  onClick: () => void;
  onClose: () => void;
}

// TODO(BUG): When you fast click on the button the request
// to fetch the list is send but the response is not received
// because the component isn't being rendered.

const SortButton: React.FC<PropsWithChildren<SortButtonProps>> = ({
  sizeType = 'sm',
  text,
  isOpen,
  children,
  onClick,
  onClose,
}) => {
  const { elementRef, handleBlur } = useOutsideClick<HTMLSelectElement>();

  return (
    <section
      className={clsx('relative py-1', {
        'bg-grey-800 rounded-t-sm': isOpen,

        'w-36 sm:w-28': sizeType === 'sm',
        'w-36 sm:w-32': sizeType === 'md',
        'w-36 sm:w-36': sizeType === 'lg',
      })}
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
    </section>
  );
};

export default SortButton;
