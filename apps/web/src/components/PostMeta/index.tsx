import { TextShorter } from '@/components';

import { PostReactions } from './components';

interface Props {
  id: string;
  content?: string;
  commentaryCount: number;
}

export const PostMeta: React.FC<Props> = props => {
  const { id, content, commentaryCount } = props;

  return (
    <div className="mt-4">
      {content && (
        <TextShorter
          className="mb-4"
          maxCharacters={200}
          text={content}
          data-testid="post-meta-content"
        />
      )}

      <PostReactions postId={id} commentaryCount={commentaryCount} />
    </div>
  );
};
