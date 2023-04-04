import { Typography } from '@/components';

import { formatDateDistanceFromMillis } from '@/utils/date-utils';

interface Props {
  name: string;
  createdAt: number;
}

export const ListInfo: React.FC<Props> = props => {
  const { name, createdAt } = props;

  const postCreationDateFormatted = formatDateDistanceFromMillis(createdAt);

  return (
    <>
      <Typography
        className="font-semibold"
        component="h1"
        color="primary"
        size="xl"
      >
        {name}
      </Typography>

      <Typography component="span" size="sm" color="tertiary">
        Published&nbsp;{postCreationDateFormatted}
      </Typography>
    </>
  );
};
