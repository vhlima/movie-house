import { useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>() {
  const elementRef = useRef<T>();

  function handleBlur(event: React.FocusEvent, onClose: () => void) {
    if (
      !elementRef.current ||
      !elementRef.current.contains(event.relatedTarget as Node)
    ) {
      onClose();
    }
  }

  return {
    elementRef,
    handleBlur,
  };
}
