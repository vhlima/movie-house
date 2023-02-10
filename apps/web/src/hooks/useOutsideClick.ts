import { useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>() {
  const listRef = useRef<T>();

  function handleBlur(event: React.FocusEvent, onClose: () => void) {
    if (
      !listRef.current ||
      !listRef.current.contains(event.relatedTarget as Node)
    ) {
      onClose();
    }
  }

  return {
    listRef,
    handleBlur,
  };
}
