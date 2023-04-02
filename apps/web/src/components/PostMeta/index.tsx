import { PostReactions, TextShorter } from '@/components';

interface Props {
  id: string;
  content?: string;
}

export const PostMeta: React.FC<Props> = props => {
  const { id, content } = props;

  return (
    <div className="mt-4">
      {content && (
        <TextShorter className="mb-4" maxCharacters={200} text={content} />
      )}

      <PostReactions postId={id} />
    </div>
  );
};
