import type { List, Movie } from '../../../graphql';

import Link from '../../Link';
import SvgIcon from '../../SvgIcon';
import Typography from '../../Typography';
import TextShorter from '../../TextShorter';
import MovieCoverList from '../../movie/MovieCoverList';

interface ListPreviewProps {
  list: {
    name: List['name'];
    movies: Array<{
      id: Movie['id'];
      originalTitle: Movie['originalTitle'];
      posterUrl: Movie['posterUrl'];
    }>;
    post: {
      id: List['post']['id'];
      body: List['post']['body'];
    };
  };
}

const ListPreview: React.FC<ListPreviewProps> = ({ list }) => {
  const { name, post, movies } = list;

  return (
    <div>
      <Link
        className="group"
        href={{
          pathname: '/lists/[id]',
          query: { id: post.id },
        }}
      >
        {movies.length > 0 && (
          <MovieCoverList
            name="list-preview-movies"
            movies={movies}
            empty={4 - movies.length}
            link={false}
          />
        )}

        <Typography
          className="font-semibold group-hover:text-grey-200"
          component="h1"
          color="primary"
          size="lg"
        >
          {name}
        </Typography>
      </Link>

      <div className="flex items-center gap-1">
        <SvgIcon iconType="TbMovie" size={24} />

        <Typography component="span" color="primary">
          {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
        </Typography>
      </div>

      {post.body && (
        <TextShorter
          className="text-grey-200 mt-1"
          text={post.body}
          maxCharacters={120}
        />
      )}

      {/* <div className="flex gap-2 items-center mt-1 ml-auto">
        <div className="flex items-center gap-1">
          <SvgIcon className="text-grey-300" iconType="AiFillHeart" size={24} />

          <Typography component="span">3.6k</Typography>
        </div>

        <div className="flex items-center gap-1">
          <SvgIcon
            className="text-grey-300"
            iconType="BsFillChatLeftFill"
            size={18}
          />
          <Typography component="span">3.6k</Typography>
        </div>
      </div> */}
    </div>
  );
};

export default ListPreview;
