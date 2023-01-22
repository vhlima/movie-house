import ActionButton from '../ActionButton';

interface RateButtonProps {
  movieId: number;
  onClick: () => void;
}

const RateButton: React.FC<RateButtonProps> = ({ movieId, onClick }) => {
  const rating = 0;

  return (
    <ActionButton
      text="Rate"
      iconType={rating > 0 ? 'AiFillStar' : 'AiOutlineStar'}
      iconColor={rating > 0 ? 'blue' : undefined}
      onClick={onClick}
    />
  );
};

export default RateButton;
