import SvgIcon from '../SvgIcon';

interface CommentaryCountProps {
  count: number;
}

const CommentaryCount: React.FC<CommentaryCountProps> = ({ count }) => (
  <div className="flex items-center gap-1">
    <SvgIcon className="text-grey-300" iconType="BsFillChatLeftFill" />

    <span className="text-grey-200 font-semibold">{count}</span>
  </div>
);

export default CommentaryCount;
