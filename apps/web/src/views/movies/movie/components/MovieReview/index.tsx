import { FindReviewsQuery } from '@/graphql';

import {
  Typography,
  StarIcon,
  TextShorter,
  SvgIcon,
  ProfilePicture,
  ListItem,
  Link,
} from '@/components';

interface Props {
  review: FindReviewsQuery['reviews']['edges'][number]['node'];
}

const MovieReview: React.FC<Props> = ({ review }) => {
  const { post, user } = review;

  return (
    <ListItem className="flex gap-2" key={`${post.id}`}>
      <ProfilePicture imageSize="md" src={user.profilePictureUrl} />

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 mt-1">
          <Link
            className="group"
            href={{ pathname: '/reviews/[id]', query: { id: review.id } }}
          >
            <Typography className="group-hover:text-grey-300" component="span">
              Review by&nbsp;
              <Typography
                className="group-hover:text-grey-200"
                component="strong"
                color="primary"
              >
                {user.username}
              </Typography>
            </Typography>
          </Link>

          <div className="flex">
            <StarIcon intent="full" />
            <StarIcon intent="half" />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>

        <TextShorter className="mb-4" maxCharacters={400} text={post.content} />

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 w-fit" type="button">
            <SvgIcon size={24} iconType="AiFillHeart" />
            <Typography className="font-bold" component="span" size="sm">
              Like review
            </Typography>
          </button>

          <Typography component="span" size="sm">
            1,412 likes
          </Typography>
        </div>
      </div>
    </ListItem>
  );
};

export default MovieReview;
