import Button from '../../../../../../../../../components/Button';
import SvgIcon from '../../../../../../../../../components/SvgIcon';

import { useUnpinReviewMutation } from '../../../../../../../../../graphql';

import { usePinnedReviewsCache } from '../../../../hooks/usePinnedReviewsCache';

interface UnpinReviewButtonProps {
  postId: string;
}

const UnpinReviewButton: React.FC<UnpinReviewButtonProps> = ({ postId }) => {
  const { updateCache } = usePinnedReviewsCache();

  const [unpinReview] = useUnpinReviewMutation({
    errorPolicy: 'all',
    update: (cache, { data }) => {
      if (!data || data.reviewUnpin.isPinned) return;

      updateCache(cacheData => ({
        reviewsUserPinned: cacheData.reviewsUserPinned.filter(
          review => review.id !== data.reviewUnpin.id,
        ),
      }));
    },
  });

  return (
    <Button
      buttonStyle="danger"
      onClick={() => unpinReview({ variables: { postId } })}
    >
      <SvgIcon iconType="FiX" size={24} />
    </Button>
  );
};

export default UnpinReviewButton;
