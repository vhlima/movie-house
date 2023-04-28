import { PreMadeListType } from '@/gql';

import { usePreMadeListMoviesCache } from '../../hooks/usePreMadeListMoviesCache';

import ActionButton from '../ActionButton';

interface WatchButtonProps {
  movieId: number;
}

const WatchButton: React.FC<WatchButtonProps> = ({ movieId }) => {
  const { isAddedToList, handleAddOrRemoveFromList } =
    usePreMadeListMoviesCache({
      listType: PreMadeListType.Watched,
      movieId,
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

export default WatchButton;
