import type { SvgIconType, LinkProps } from '@/components';

import { Feature } from '../index';

type Feature = {
  iconType: SvgIconType;
  link: LinkProps;
  text: string;
};

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

export const FeatureList: React.FC = () => (
  <ul className="grid gap-2 lg:grid-cols-2">
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
