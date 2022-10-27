import { UserListType } from '../../../../../../graphql';

import InfoButton from './components/InfoButton';

import { useLogic } from './logic';

interface InfoButtonsProps {
  movieId: number;

  onRate: () => void;
}

const InfoButtons: React.FC<InfoButtonsProps> = ({ movieId, onRate }) => {
  const {
    movieOptionsResponse: { data },
    handleAddOrRemoveMovieFromList,
  } = useLogic({ movieId });

  return (
    <div className="flex justify-center gap-8 text-grey-300">
      <InfoButton
        text="Rate"
        iconType={
          data?.movieRating?.rating > 0 ? 'AiFillStar' : 'AiOutlineStar'
        }
        iconColor={data?.movieRating ? 'blue' : undefined}
        onClick={onRate}
      />

      <InfoButton
        text="Watch"
        iconType={data?.isOnWatchLater ? 'AiFillEye' : 'AiOutlineEye'}
        iconColor={data?.isOnWatchLater ? 'green' : undefined}
        onClick={() => handleAddOrRemoveMovieFromList(UserListType.WatchLater)}
      />

      <InfoButton
        text="Like"
        iconType="AiOutlineHeart"
        // iconType={userRate?.liked ? 'AiFillHeart' : 'AiOutlineHeart'}
        // iconColor={userRate?.liked ? 'red' : undefined}
        // onClick={() => handleClick('like')}
      />

      <InfoButton
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

export default InfoButtons;
