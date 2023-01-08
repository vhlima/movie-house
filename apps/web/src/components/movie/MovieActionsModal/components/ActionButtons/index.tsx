import { UserListType } from '../../../../../graphql';

import ActionButton from './components/ActionButton';

import { useLogic } from './logic';

interface ActionButtonsProps {
  movieId: number;

  onRate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ movieId, onRate }) => {
  const {
    movieOptionsResponse: { data },
    handleAddOrRemoveMovieFromList,
  } = useLogic({ movieId });

  return (
    <div className="flex justify-center gap-8 text-grey-300">
      <ActionButton
        text="Rate"
        iconType={
          data?.movieRating?.rating > 0 ? 'AiFillStar' : 'AiOutlineStar'
        }
        iconColor={data?.movieRating ? 'blue' : undefined}
        onClick={onRate}
      />

      <ActionButton
        text="Watch"
        iconType={data?.isOnWatchLater ? 'AiFillEye' : 'AiOutlineEye'}
        iconColor={data?.isOnWatchLater ? 'green' : undefined}
        onClick={() => handleAddOrRemoveMovieFromList(UserListType.WatchLater)}
      />

      <ActionButton
        text="Like"
        iconType="AiOutlineHeart"
        // iconType={userRate?.liked ? 'AiFillHeart' : 'AiOutlineHeart'}
        // iconColor={userRate?.liked ? 'red' : undefined}
        // onClick={() => handleClick('like')}
      />

      <ActionButton
        text="Watchlist"
        iconType={
          data?.isOnWatchList ? 'AiFillClockCircle' : 'AiOutlineClockCircle'
        }
        iconColor={data?.isOnWatchList ? 'blue' : undefined}
        onClick={() => handleAddOrRemoveMovieFromList(UserListType.Watchlist)}
      />
    </div>
  );
};

export default ActionButtons;
