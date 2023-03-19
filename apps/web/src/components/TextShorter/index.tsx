import clsx from 'clsx';

import { useState } from 'react';

import { Typography } from '@/components';

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
    <Typography className={clsx(className && className)} component="p">
      {isCollapsed || !collapse ? text : `${text.slice(0, maxCharacters)}...`}

      {collapse && (
        <button
          className="inline-flex items-center gap-2 group ml-1"
          type="button"
          onClick={() => setCollapsed(prev => !prev)}
        >
          {!isCollapsed ? (
            <Typography
              className="hover:underline"
              component="span"
              color="primary"
            >
              See more
            </Typography>
          ) : (
            <Typography
              className="hover:underline"
              component="span"
              color="primary"
            >
              See less
            </Typography>
          )}
        </button>
      )}
    </Typography>
  );
};
