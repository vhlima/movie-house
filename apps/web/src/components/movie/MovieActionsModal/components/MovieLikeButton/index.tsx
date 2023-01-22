import ActionButton from '../ActionButton';

interface MovieLikeButtonProps {
  movieId: number;
}

const MovieLikeButton: React.FC<MovieLikeButtonProps> = ({ movieId }) => {
  const a = 1;

  return (
    <ActionButton
      text="Like"
      iconType="AiOutlineHeart"
      // iconType={userRate?.liked ? 'AiFillHeart' : 'AiOutlineHeart'}
      // iconColor={userRate?.liked ? 'red' : undefined}
      // onClick={() => handleClick('like')}
    />
  );
};

export default MovieLikeButton;
