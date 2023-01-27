import Button from '../../../../../../../../../components/Button';

import SvgIcon from '../../../../../../../../../components/SvgIcon';

import {
  PreMadeListType,
  useRemoveMovieFromPreMadeListMutation,
} from '../../../../../../../../../graphql';

interface RemoveMovieFromPreMadeListButtonProps {
  movieId: number;
  listType: PreMadeListType;
  onCacheUpdate: (movieId: number) => void;
}

const RemoveMovieFromPreMadeListButton: React.FC<
  RemoveMovieFromPreMadeListButtonProps
> = ({ movieId, listType, onCacheUpdate }) => {
  const [removeMovieFromPreMadeList] = useRemoveMovieFromPreMadeListMutation({
    errorPolicy: 'all',
    update: (cache, { data }, context) => {
      if (!data) return;

      onCacheUpdate(context.variables.movieId);
    },
  });

  return (
    <Button
      buttonStyle="danger"
      onClick={() =>
        removeMovieFromPreMadeList({
          variables: { movieId, listType },
        })
      }
    >
      <SvgIcon iconType="FiX" size={24} />
    </Button>
  );
};

export default RemoveMovieFromPreMadeListButton;