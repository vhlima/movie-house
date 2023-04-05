import { Card } from '@/components';

import type { Feature } from './types';

import { FeatureList } from './components';

const features: Feature[] = [
  {
    iconType: 'AiFillEye',
    link: { href: '/' },
    text: 'Keep track of every film youve ever watched (or just start from the day you join)',
  },
  {
    iconType: 'AiFillHeart',
    link: { href: '/' },
    text: 'Show some love for your favorite movies, lists and reviews by liking, commenting and reviewing',
  },
  {
    iconType: 'IoList',
    link: { href: '/' },
    text: 'Write and share reviews, and follow friends and other members to read theirs',
  },
  {
    iconType: 'AiFillStar',
    link: { href: '/' },
    text: 'Rate each film on a five-star scale (with halves) to record and share your reaction',
  },
  {
    iconType: 'AiOutlineCalendar',
    link: { href: '/' },
    text: 'Keep a diary of your film watching',
  },
  {
    iconType: 'AiFillHeart',
    link: { href: '/' },
    text: 'Compile and share lists of films on any topic and keep a watchlist of films to see',
  },
];

export const FeaturesCard: React.FC = () => (
  <Card>
    <Card.Header title="Features you will love" marginBottom />

    <Card.Body>
      <FeatureList features={features} />
    </Card.Body>
  </Card>
);
