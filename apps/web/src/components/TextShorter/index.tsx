import clsx from 'clsx';

import { useState } from 'react';

import { Typography, Button, SvgIcon } from '@/components';

interface TextShorterProps {
  className?: string;
  text: string;
  maxCharacters: number;
}

export const TextShorter: React.FC<TextShorterProps> = ({
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
          className="gap-2"
          intent="secondary"
          size="sm"
          full={false}
          onClick={() => setCollapsed(prev => !prev)}
        >
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
        </Button>
      )}
    </Typography>
  );
};
