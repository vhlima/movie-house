import { PropsWithChildren, useRef } from 'react';

import SvgIcon from '../../../../../../../../components/SvgIcon';
import Typography from '../../../../../../../../components/Typography';

interface SortListItemProps {
  text: string;
  onClick: () => void;
}

const SortListItem: React.FC<PropsWithChildren<SortListItemProps>> = ({
  text,
  onClick,
  children,
}) => {
  const listRef = useRef<HTMLLIElement>();

  function handleBlur(event: React.FocusEvent<HTMLLIElement>) {
    if (
      !listRef.current ||
      !listRef.current.contains(event.relatedTarget as Node)
    ) {
      onClick();
    }
  }

  return (
    <li
      className="relative bg-grey-800 border-r border-r-grey-700 last:border-r-0"
      ref={listRef}
      onBlur={e => handleBlur(e)}
    >
      <button
        className="flex items-center gap-1 w-full px-4 lg:px-3 py-0.5"
        type="button"
        onClick={onClick}
      >
        <Typography className="uppercase" component="span" size="sm">
          {text}
        </Typography>

        <SvgIcon className="flex-shrink-0" iconType="FaChevronDown" />
      </button>

      {children}
    </li>
  );
};

export default SortListItem;
