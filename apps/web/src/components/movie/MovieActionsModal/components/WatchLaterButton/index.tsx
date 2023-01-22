import { PreMadeListType } from '../../../../../graphql';

import { usePreMadeListMoviesCache } from '../../hooks/usePreMadeListMoviesCache';

import ActionButton from '../ActionButton';

interface WatchLaterButtonProps {
  movieId: number;
}

const WatchLaterButton: React.FC<WatchLaterButtonProps> = ({ movieId }) => {
  const { isAddedToList, handleAddOrRemoveFromList } =
    usePreMadeListMoviesCache({
      listType: PreMadeListType.WatchLater,
    });

  return (
    <ActionButton
      text="Watch"
      iconType={isAddedToList ? 'AiFillEye' : 'AiOutlineEye'}
      iconColor={isAddedToList ? 'green' : undefined}
      onClick={() => handleAddOrRemoveFromList(movieId)}
    />
  );
};

export default WatchLaterButton;
