import { Field, useField } from 'formik';

import type { PropsWithChildren } from 'react';

import Typography from '../../../Typography';

interface InputLabelProps {
  htmlFor: string;
  text: string;
  formik?: boolean;
}

const InputLabel: React.FC<PropsWithChildren<InputLabelProps>> = ({
  htmlFor,
  text,
  formik = true,
  children,
}) => {
  const a = 1;

  return (
    <div className="flex flex-col gap-1">
      {!htmlFor ? (
        <Typography className="font-bold" component="span">
          {text}
        </Typography>
      ) : (
        <label className="text-grey-200 font-bold" htmlFor={htmlFor}>
          {text}
        </label>
      )}

      {children}

      {formik && (
        <Field name={htmlFor}>
          {({ meta }) =>
            meta &&
            meta.error && (
              <Typography component="span" color="error">
                {meta.error}
              </Typography>
            )
          }
        </Field>
      )}

      {/* {formik && (
        <Field id={htmlFor}>
          {({ meta }) =>
            meta.error && (
              <Typography component="span" color="error">
                {meta.error}
              </Typography>
            )
          }
        </Field>
      )} */}
    </div>
  );
};

export default InputLabel;
