import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={clsx('bg-grey-800 rounded-md', className)} />
);

export default Skeleton;
