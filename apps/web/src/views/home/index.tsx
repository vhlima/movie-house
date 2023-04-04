import { Typography } from '@/components';

import { PopularMoviesWeek } from '@/components/movie';

import BackdropImage from '../../components/BackdropImage';

import PopularReviewsWeek from '../../components/review/PopularReviewsWeek';

import { FeaturesCard, PopularListsWeek } from './components';

const HomeView: React.FC = () => (
  <BackdropImage
    className="flex flex-col gap-4"
    src="https://a.ltrbxd.com/resized/sm/upload/ah/66/ey/4h/top-gun-maverick-1200-1200-675-675-crop-000000.jpg"
    alt="Homepage backdrop image"
  >
    <div className="relative flex flex-col items-center gap-2 mb-8">
      <Typography
        className="font-mono font-bold"
        component="h1"
        color="primary"
        size="4xl"
      >
        MovieHouse
      </Typography>

      <Typography className="text-center" component="p" size="xl">
        Stay on top of watched movies. <br />
        Keep a list of the ones you want to see. <br />
        Share your top recommendations with your friends.
      </Typography>

      <Typography className="text-center" component="span" color="tertiary">
        Ready to take your movie obsession to the next level? Join the premier
        social network for film enthusiasts now!
      </Typography>
    </div>

    <PopularMoviesWeek />

    <FeaturesCard />

    <PopularReviewsWeek />

    <PopularListsWeek />
  </BackdropImage>
);

export default HomeView;
