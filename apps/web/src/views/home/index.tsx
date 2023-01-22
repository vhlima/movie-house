import BackdropImage from '../../components/BackdropImage';
import PageContent from '../../components/PageContent';
import Typography from '../../components/Typography';

import PopularReviewsWeek from '../../components/review/PopularReviewsWeek';

import Features from './components/Features';
import PopularMovies from './components/PopularMovies';

const HomeView: React.FC = () => (
  <BackdropImage src="https://a.ltrbxd.com/resized/sm/upload/ah/66/ey/4h/top-gun-maverick-1200-1200-675-675-crop-000000.jpg">
    <PageContent className="flex flex-col gap-4">
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
          Track films youve watched. <br />
          Save those you want to see. <br />
          Tell your friends whats good.
        </Typography>

        <span className="text-grey-300">
          The social network for movie lovers.
        </span>
      </div>

      <PopularMovies />

      <Features />

      <PopularReviewsWeek />

      {/* <Card
          title="Popular lists"
          link={{ href: '/' }}
          gap={false}
          noPadding
        /> */}
    </PageContent>
  </BackdropImage>
);

export default HomeView;
