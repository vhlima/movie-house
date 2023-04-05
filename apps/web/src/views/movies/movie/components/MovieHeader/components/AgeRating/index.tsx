import { Typography } from '@/components';

interface Props {
  age: number;
}

export const AgeRating: React.FC<Props> = props => {
  const { age } = props;

  return (
    <div className="rounded-md border border-grey-700 px-2 py-1">
      <Typography component="span">{age}</Typography>
    </div>
  );
};
