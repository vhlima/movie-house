import type { ReviewResponse } from '../../../../../types/review';

import Link from '../../../../../components/Link';

import ListItem from '../../../../../components/ListItem';

import MovieCover from '../../../../movies/components/Cover';

import MovieRatingStar from '../../../../movies/components/RatingStar';
import UserText from '../../../../../components/UserText';

// import Post from '../../../components/Post';

interface ReviewBodyProps {
  review: ReviewResponse;
  preview?: boolean;
}

/*
  Review body can be used to compose both review page and review preview 
*/

const ReviewBody: React.FC<ReviewBodyProps> = ({ review, preview }) => {
  const { movie } = review;

  // TODO post here was basically <Interaction> with like and comment buttons

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

      <UserText
        user={review.author}
        text={review.body}
        textShort={preview}
        header={
          <>
            <Link
              className="group"
              href={
                preview
                  ? {
                      pathname: '/reviews/[id]',
                      query: { id: review._id },
                    }
                  : {
                      pathname: '/users/[id]',
                      query: { id: review.author._id },
                    }
              }
            >
              {preview && (
                <span className="text-gray-200 group-hover:text-grey-300 mr-1">
                  Reviewed by
                </span>
              )}

              {/* <span className="text-gray-100 font-semibold group-hover:text-grey-200">
                {review.author.username}
              </span> */}
            </Link>

            {!preview && (
              <span className="text-grey-200 text-sm">in Aug 28, 2019</span>
            )}

            <MovieRatingStar
              color="blue"
              rating={3.5}
              marginAuto
              reverse
              checked
            />
          </>
        }
      />
    </ListItem>
  );
};

export default ReviewBody;
