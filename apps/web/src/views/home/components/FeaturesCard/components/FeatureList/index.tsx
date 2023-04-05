import { Feature as FeatureProps } from '../../types';

import { Feature } from '../index';

interface Props {
  features: FeatureProps[];
}

export const FeatureList: React.FC<Props> = ({ features }) => (
  <ul className="grid gap-2 lg:grid-cols-2" data-testid="feature-list">
    {features.map(({ iconType, link, text }) => (
      <Feature
        key={`feature-${text}`}
        iconType={iconType}
        text={text}
        link={link}
      />
    ))}
  </ul>
);
