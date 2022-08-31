import { useState } from 'react';

import Button from '../Button';

import SvgIcon from '../SvgIcon';

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

  const isMaxCharacters = text.length > maxCharacters;

  return (
    <p className={className && className}>
      {isCollapsed || !isMaxCharacters
        ? text
        : `${text.slice(0, maxCharacters)}...`}

      {isMaxCharacters && (
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
    </p>
  );
};

export default TextShorter;
