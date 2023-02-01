import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import SvgIcon from '../../../../components/SvgIcon';
import Typography from '../../../../components/Typography';

interface MovieListSortButtonProps {
  text: string;
  isOpen?: boolean;
  onClick: () => void;
}

const MovieListSortButton: React.FC<
  PropsWithChildren<MovieListSortButtonProps>
> = ({ text, isOpen, onClick, children }) => (
  <section className="relative">
    <button
      className={clsx('flex items-center', {
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

    {isOpen && <div className="absolute top-5 bg-grey-800">{children}</div>}
  </section>
);

export default MovieListSortButton;
