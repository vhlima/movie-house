import clsx from 'clsx';

import SvgIcon from '../SvgIcon';

interface LoadingSpinnerProps {
  className?: string;
  center?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  center,
}) => {
  const spinner = (
    <SvgIcon
      className="text-grey-300 animate-spin"
      iconType="CgSpinner"
      size={36}
    />
  );

  return !className && !center ? (
    spinner
  ) : (
    <div
      className={clsx(className && className, {
        'flex justify-center': center,
      })}
    >
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
