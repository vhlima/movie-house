import {
  formatDate,
  formatMintutesToHoursAndMinutes,
} from '@/utils/date-utils';

import { Typography } from '@/components';

interface Props {
  originalTitle: string;
  runtime: number;
  releaseDate: string;
}

export const MovieDetails: React.FC<Props> = props => {
  const { originalTitle, runtime, releaseDate } = props;

  const movieReleaseDateFormatted = formatDate(releaseDate, 'dd/MM/yyyy');

  const runtimeFormatted = formatMintutesToHoursAndMinutes(runtime);

  return (
    <>
      <Typography
        className="font-bold"
        component="h1"
        color="primary"
        size="2xl"
      >
        {originalTitle}
      </Typography>

      <Typography component="span" size="sm">
        {movieReleaseDateFormatted}
        &nbsp; • &nbsp;
        {formatMintutesToHoursAndMinutes(runtime)}
      </Typography>

      <Typography component="span" size="sm">
        <Typography component="span" size="sm" data-testid="movie-release-date">
          {movieReleaseDateFormatted}
        </Typography>
        &nbsp; • &nbsp;
        <Typography component="span" size="sm" data-testid="movie-runtime">
          {runtimeFormatted}
        </Typography>
      </Typography>
    </>
  );
};
