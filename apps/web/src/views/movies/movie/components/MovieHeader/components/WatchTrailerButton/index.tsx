import { Button } from '@/components';

interface Props {
  id: number;
}

export const WatchTrailerButton: React.FC<Props> = props => {
  const { id } = props;

  return (
    <Button intent="secondary" size="sm" full={false}>
      Watch trailer
    </Button>
  );
};
