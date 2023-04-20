import { Typography, RatingStars } from '@/components';

import { formatDateFromMillis } from '@/utils/date-utils';

interface Props {
  rating: number;
  createdAt: number;
}

export const ReviewDetails: React.FC<Props> = props => {
  const { rating, createdAt } = props;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <RatingStars rating={rating} />

      <Typography component="p" color="tertiary" size="sm">
        Watched {formatDateFromMillis(createdAt)}
      </Typography>
    </div>
  );
};
