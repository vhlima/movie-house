import { Card } from '@/components';

import { FeatureList } from './components';

export const Features: React.FC = () => (
  <Card>
    <Card.Header title="Features you will love" marginBottom />

    <Card.Body>
      <FeatureList />
    </Card.Body>
  </Card>
);
