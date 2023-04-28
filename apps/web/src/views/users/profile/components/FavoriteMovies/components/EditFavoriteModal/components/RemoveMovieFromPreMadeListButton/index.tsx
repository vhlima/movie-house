import { PreMadeListType, useRemoveMovieFromPreMadeListMutation } from '@/gql';

import { Button, SvgIcon } from '@/components';

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
      intent="danger"
      title="Click to remove"
      onClick={() =>
        removeMovieFromPreMadeList({
          variables: { movieId, listType },
        })
      }
    >
      <SvgIcon className="text-inherit" iconType="FiX" size={24} />
    </Button>
  );
};

export default RemoveMovieFromPreMadeListButton;
