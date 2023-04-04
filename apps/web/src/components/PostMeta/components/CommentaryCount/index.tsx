import { SvgIcon, Typography } from '@/components';

interface Props {
  commentaryCount: number;
}

export const CommentaryCount: React.FC<Props> = props => {
  const { commentaryCount } = props;

  return (
    <div className="flex items-center gap-1 w-fit">
      <SvgIcon iconType="HiChatBubbleBottomCenter" size={22} />

      <Typography
        className="font-medium"
        component="span"
        size="sm"
        data-testid="commentary-count"
      >
        {commentaryCount}
      </Typography>
    </div>
  );
};
