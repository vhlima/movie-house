import React, { PropsWithChildren } from 'react';

import clsx from 'clsx';

interface FieldLabelProps {
  className?: string;
  label: string;
  htmlFor?: string;
}

const FieldLabel: React.FC<PropsWithChildren<FieldLabelProps>> = ({
  className,
  label,
  htmlFor,
  children,
}) => {
  const labelStyles = 'text-grey-200 font-semibold';

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {!htmlFor ? (
        <span className={labelStyles}>{label}</span>
      ) : (
        <label className={labelStyles} htmlFor={htmlFor}>
          {label}
        </label>
      )}

      {children}
    </div>
  );
};

export default FieldLabel;
