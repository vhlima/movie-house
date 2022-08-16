import SvgIcon from '../SvgIcon';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  const spinner = (
    <SvgIcon
      className="text-grey-300 animate-spin"
      iconType="CgSpinner"
      size={36}
    />
  );

  return !className ? spinner : <div className={className}>{spinner}</div>;
};

export default LoadingSpinner;
