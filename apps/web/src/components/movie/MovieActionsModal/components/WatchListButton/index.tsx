import { PreMadeListType } from '../../../../../graphql';

import { usePreMadeListMoviesCache } from '../../hooks/usePreMadeListMoviesCache';

import ActionButton from '../ActionButton';

interface WatchListButtonProps {
  movieId: number;
}

const WatchListButton: React.FC<WatchListButtonProps> = ({ movieId }) => {
  const { isAddedToList, handleAddOrRemoveFromList } =
    usePreMadeListMoviesCache({
      listType: PreMadeListType.Watchlist,
      movieId,
    });

  return (
    <ActionButton
      text="Watchlist"
      iconType={isAddedToList ? 'AiFillClockCircle' : 'AiOutlineClockCircle'}
      iconColor={isAddedToList ? 'blue' : undefined}
      onClick={() => handleAddOrRemoveFromList(movieId)}
    />
  );
};

export default WatchListButton;
