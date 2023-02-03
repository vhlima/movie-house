import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import SvgIcon from '../../../../components/SvgIcon';
import Typography from '../../../../components/Typography';

interface SortButtonProps {
  text: string;
  isOpen?: boolean;
  onClick: () => void;
}

const SortButton: React.FC<PropsWithChildren<SortButtonProps>> = ({
  text,
  isOpen,
  onClick,
  children,
}) => (
  <section className="relative">
    <button
      className={clsx('flex items-center border border-transparent', {
        'bg-grey-800': isOpen,
      })}
      type="button"
      onClick={onClick}
    >
      <Typography className="uppercase" component="span" size="sm">
        {text}
      </Typography>

      <SvgIcon className="text-grey-300 ml-2" iconType="FaChevronDown" />
    </button>

    {isOpen && children}
  </section>
);

export default SortButton;
