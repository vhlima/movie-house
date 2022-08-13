import { useField } from 'formik';

import type { RefObject, PropsWithChildren } from 'react';

import RawInput from './Raw';

import type { RawInputProps, InputReferenceType } from './Raw';

interface InputInternalProps {
  reference?: RefObject<InputReferenceType>;
  formik?: boolean;
  autoGrow?: {
    maxHeight: number;
  };
  label?: {
    text: string;
    htmlFor?: boolean;
  };
}

type InputProps = InputInternalProps & RawInputProps;

export const FormikInput: React.FC<InputProps> = ({
  name,
  error,
  reference,
  textarea,
  autoGrow,
  onKeyUp,
  ...rest
}) => {
  const [field, meta] = useField(name);

  return (
    <RawInput
      ref={reference}
      error={meta.error || error}
      rows={autoGrow && 1}
      textarea={!autoGrow ? textarea : true}
      style={autoGrow && { maxHeight: autoGrow.maxHeight, overflowY: 'auto' }}
      onKeyUp={e => {
        if (autoGrow) {
          const { current } = reference;

          if (!current) return;

          /* eslint-disable no-param-reassign */
          reference.current.style.height = !current.value
            ? 'auto'
            : `${current.scrollHeight}px`;
        }

        if (onKeyUp) {
          onKeyUp(e);
        }
      }}
      {...rest}
      {...field}
    />
  );
};

// TODO change error to be first element

const Input: React.FC<PropsWithChildren<InputProps>> = ({
  formik,
  label,
  name,
  autoGrow,
  reference,
  ...rest
}) => {
  const rawInput = !formik ? (
    <RawInput ref={reference} name={name} {...rest} />
  ) : (
    <FormikInput
      reference={reference}
      name={name}
      autoGrow={autoGrow}
      {...rest}
    />
  );

  return !label ? (
    rawInput
  ) : (
    <div className="flex flex-col gap-1">
      {!label.htmlFor ? (
        <span className="text-grey-200 font-semibold">{label.text}</span>
      ) : (
        <label className="text-grey-200 font-semibold" htmlFor={name}>
          {label.text}
        </label>
      )}

      {rawInput}
    </div>
  );
};

export default Input;
