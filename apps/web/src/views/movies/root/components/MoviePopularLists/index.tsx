import { useFindUserListsQuery } from '../../../../../graphql';

import Card from '../../../../../components/Card';

interface MoviePopularListsProps {
  movieId: number;
}

const MoviePopularLists: React.FC<MoviePopularListsProps> = ({ movieId }) => {
  const { data: popularListsData } = useFindUserListsQuery({
    variables: { userId: '' },
  });

  return (
    <Card title="Popular lists" link={{ href: '/' }} noPadding>
      {popularListsData && (
        <ul>
          {popularListsData.userLists.map(list => (
            <h1 key={`movie-popular-lists-${list.post.id}`}>
              list here {list.name}
            </h1>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default MoviePopularLists;
