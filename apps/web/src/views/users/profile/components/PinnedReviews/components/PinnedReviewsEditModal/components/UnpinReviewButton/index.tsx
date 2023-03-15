import { useToggleReviewPinMutation } from '@/graphql';
import { Button, SvgIcon } from '@/components';

import { usePinnedReviewsCache } from '../../../../hooks/usePinnedReviewsCache';

interface UnpinReviewButtonProps {
  reviewId: string;
}

const UnpinReviewButton: React.FC<UnpinReviewButtonProps> = ({ reviewId }) => {
  const { updateCache } = usePinnedReviewsCache();

  const [unpinReview] = useToggleReviewPinMutation({
    errorPolicy: 'all',
    update: (_, { data }, ctx) => {
      if (!data || data.toggleReviewPin) return;

      updateCache(cacheData => ({
        ...cacheData,
        reviews: {
          ...cacheData.reviews,
          edges: cacheData.reviews.edges.filter(
            edge => edge.node.id !== ctx.variables.reviewId,
          ),
        },
      }));
    },
  });

  return (
    <Button
      intent="danger"
      onClick={() => unpinReview({ variables: { reviewId } })}
    >
      <SvgIcon className="text-inherit" iconType="FiX" size={24} />
    </Button>
  );
};

export default UnpinReviewButton;
