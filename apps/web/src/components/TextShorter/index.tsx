import clsx from 'clsx';

import { useState } from 'react';

import Button from '../Button';

import SvgIcon from '../SvgIcon';
import Typography from '../Typography';

interface TextShorterProps {
  className?: string;
  text: string;
  maxCharacters: number;
}

const TextShorter: React.FC<TextShorterProps> = ({
  className,
  text,
  maxCharacters,
}) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);

  const collapse =
    text.length > maxCharacters && text.length - maxCharacters >= maxCharacters;

  return (
    <Typography
      className={clsx('break-words', className && className)}
      component="p"
    >
      {isCollapsed || !collapse ? text : `${text.slice(0, maxCharacters)}...`}

      {collapse && (
        <Button
          buttonStyle="tertiary"
          buttonSize="none"
          full={false}
          onClick={() => setCollapsed(prev => !prev)}
        >
          <div className="flex gap-1 items-center">
            {!isCollapsed ? (
              <>
                <span>See more</span>
                <SvgIcon iconType="FaChevronDown" />
              </>
            ) : (
              <>
                <span>See less</span>
                <SvgIcon iconType="FaChevronUp" />
              </>
            )}
          </div>
        </Button>
      )}
    </Typography>
  );
};

export default TextShorter;
