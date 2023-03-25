import {
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Input } from '@/components';

interface AutoGrowProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
  rows?: number;
  formik?: boolean;
}

const AutoGrow: React.FC<AutoGrowProps> = ({
  maxHeight = 250,
  rows = 1,
  onKeyUp,
  ...props
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [initialHeight, setInitialHeight] = useState<number>(0);

  useEffect(() => {
    const { current } = inputRef;

    if (current) {
      setInitialHeight(current.offsetHeight);
    }
  }, [inputRef]);

  function handleAutoGrow(event: KeyboardEvent<HTMLTextAreaElement>) {
    const { current } = inputRef;

    if (!current) return;

    const { scrollHeight } = current;

    /* eslint-disable no-param-reassign */
    inputRef.current.style.height = !current.value
      ? `${initialHeight}px`
      : `${scrollHeight > maxHeight ? maxHeight : scrollHeight}px`;

    if (onKeyUp) {
      onKeyUp(event);
    }
  }

  return (
    <Input
      ref={inputRef}
      textarea
      rows={rows}
      onKeyUp={e => handleAutoGrow(e)}
      {...props}
    />
  );
};

export default AutoGrow;
