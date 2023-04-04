import { Card } from '@/components';

import { FeatureList } from './components';

export const FeaturesCard: React.FC = () => (
  <Card>
    <Card.Header title="Features you will love" marginBottom />

    <Card.Body>
      <FeatureList />
    </Card.Body>
  </Card>
);
