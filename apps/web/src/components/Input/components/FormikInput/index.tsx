import { useRef } from 'react';

import { useField } from 'formik';

import type { BaseInputProps } from '../BaseInput';

import BaseInput from '../BaseInput';

interface FormikInputInternalProps {
  autoGrow?: {
    maxHeight: number;
  };
}

export type FormikInputProps = FormikInputInternalProps & BaseInputProps;

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  error,
  textarea,
  autoGrow,
  onKeyUp,
  ...rest
}) => {
  const [field, meta] = useField(name);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleAutoGrow = event => {
    if (autoGrow) {
      const { current } = inputRef;

      if (!current) return;

      /* eslint-disable no-param-reassign */
      inputRef.current.style.height = !current.value
        ? 'auto'
        : `${current.scrollHeight}px`;
    }

    if (onKeyUp) {
      onKeyUp(event);
    }
  };

  return (
    <BaseInput
      ref={inputRef}
      error={meta.error || error}
      rows={autoGrow && 1}
      textarea={!autoGrow ? textarea : true}
      style={autoGrow && { maxHeight: autoGrow.maxHeight, overflowY: 'auto' }}
      onKeyUp={autoGrow && handleAutoGrow}
      {...rest}
      {...field}
    />
  );
};

export default FormikInput;
