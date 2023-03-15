import { useProfile } from '@/views/users/hooks/useProfile';
import { Typography } from '@/components';
import Card from '../../../../../components/Card';

import PencilButton from '../PencilButton';

const Biography: React.FC = () => {
  const { user } = useProfile();

  const { username, biography } = user;

  return (
    <Card>
      <Card.Header title="About me" marginBottom>
        <PencilButton />
      </Card.Header>

      <Card.Body>
        <Typography className="whitespace-pre-wrap" component="p">
          {biography || `${username} hasn't told us anything about him yet.`}
        </Typography>
      </Card.Body>
    </Card>
  );
};

export default Biography;
