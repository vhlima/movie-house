import React, { useState } from 'react';

import Button from '../Button';

import SvgIcon from '../SvgIcon';

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

  return (
    <p className={className && className}>
      {!isCollapsed ? `${text.slice(0, maxCharacters)}...` : text}

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
    </p>
  );
};
