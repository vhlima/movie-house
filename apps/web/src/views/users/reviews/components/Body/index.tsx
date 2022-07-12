import type { ReviewResponse } from '../../../../../types/user';

import type { UserMovieReviewProps } from '../..';

import Link from '../../../../../components/Link';

import ListItem from '../../../../../components/ListItem';

import MovieCover from '../../../../movies/components/Cover';

import MovieRatingStar from '../../../../movies/components/RatingStar';

import Post from '../../../components/Post';

interface UserMovieReviewBodyProps extends UserMovieReviewProps {
  review: ReviewResponse;
  preview?: boolean;
}

/*
  Review body can be used to compose both review page and review preview 
*/

const UserMovieReviewBody: React.FC<UserMovieReviewBodyProps> = ({
  review,
  preview,
}) => {
  const { movie } = review;

  // TODO return directly from database release_date formated as { day: 1, month: 1, year: 1 }

  return (
    <ListItem>
      {preview && (
        <div className="flex gap-2 mb-2">
          <MovieCover coverUrl={movie.posterUrl} />

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Link
                className="text-grey-100 text-xl font-semibold hover:text-grey-300"
                href="/"
              >
                {movie.original_title}
              </Link>

              <span className="text-grey-200">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            </div>

            <MovieRatingStar color="yellow" rating={5.5} checked />
          </div>
        </div>
      )}

      <Post
        text="Pretty similar to how I feel about the Brockhampton documentary. As a Travis Scott fan, I dug it, but thats only really because Im familiar with him, his performances, his music, and this is just a closer look at all of that. If youre going into this knowing nothing, youll come away knowing about the same and probably even a little turned off by how up his own ass Travis comes across through this. Unlike Brockhamptons doc, this had barely any structure to it and doesnt really give you anything to get hooked on. Which sucks because it makes it pretty clear that Travis is a pretty interesting guy with an interesting story but it just kinda...doesnt do anything with that. Cant believe I just wrote a serious review for a Travis Scott Netflix documentary lol."
        textShort={preview}
      >
        <Link
          className="group"
          href={preview ? '/reviews/abc' : `/users/62c3aa474ae79b70456f7c5c`}
        >
          {preview && (
            <span className="text-gray-200 group-hover:text-grey-300 mr-1">
              Reviewed by
            </span>
          )}

          <span className="text-gray-100 font-semibold group-hover:text-grey-200">
            karsten
          </span>
        </Link>

        {!preview && (
          <span className="text-grey-200 text-sm">in Aug 28, 2019</span>
        )}

        <MovieRatingStar color="blue" rating={3.5} marginAuto reverse checked />
      </Post>
    </ListItem>
  );
};

export default UserMovieReviewBody;
