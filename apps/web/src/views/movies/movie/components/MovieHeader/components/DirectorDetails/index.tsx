import { Typography } from '@/components';

interface Props {
  directorName: string;
}

export const DirectorDetails: React.FC<Props> = props => {
  const { directorName } = props;

  return (
    <Typography component="span">
      Directed by&nbsp;
      <Typography component="strong" color="primary">
        {directorName}
      </Typography>
    </Typography>
  );
};
