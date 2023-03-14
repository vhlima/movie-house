import clsx from 'clsx';

import { forwardRef } from 'react';

import type {
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  RefAttributes,
  RefObject,
} from 'react';

import { Field } from 'formik';

import InputIcon from './components/Icon';
import InputLabel from './components/Label';
import AutoGrow from './components/AutoGrow';
import InputContainer from './components/Container';

type InputElementProps = InputHTMLAttributes<HTMLInputElement>;
type TextAreaElementProps = InputHTMLAttributes<HTMLTextAreaElement>;

type InputAttributes =
  | InputElementProps
  | (TextAreaElementProps & { rows?: number });

interface InputSubComponents {
  Container: typeof InputContainer;
  Label: typeof InputLabel;
  Icon: typeof InputIcon;
  AutoGrow: typeof AutoGrow;
}

type InputProps = InputAttributes & {
  textarea?: boolean;
  formik?: boolean;
  autoGrow?: boolean;
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ id, textarea, formik = true, ...props }, ref) => {
    const inputStyles =
      'w-full h-10 p-2 bg-transparent outline-none text-white placeholder-grey-400';

    function buildInput(inputProps?: InputElementProps | TextAreaElementProps) {
      return !textarea ? (
        <input
          className={inputStyles}
          ref={ref as RefObject<HTMLInputElement>}
          type="input"
          id={id}
          {...(props as InputElementProps)}
          {...(inputProps as InputElementProps)}
        />
      ) : (
        <textarea
          className={clsx(inputStyles, 'resize-none')}
          ref={ref as RefObject<HTMLTextAreaElement>}
          id={id}
          rows={1}
          {...(props as TextAreaElementProps)}
          {...(inputProps as TextAreaElementProps)}
        />
      );
    }

    if (formik) {
      return <Field name={id}>{({ field }) => buildInput(field)}</Field>;
    }

    return buildInput();
  },
) as ForwardRefExoticComponent<
  InputProps & RefAttributes<HTMLInputElement | HTMLTextAreaElement>
> &
  InputSubComponents;

Input.Container = InputContainer;
Input.Label = InputLabel;
Input.Icon = InputIcon;
Input.AutoGrow = AutoGrow;

export default Input;
