import Logo from '../../components/Logo';

import Card from '../../components/Card';

import Link from '../../components/Link';

import BackdropImage from '../../components/BackdropImage';

import PageContent from '../../components/PageContent';

import Features from './components/Features';

import PopularMovies from './components/PopularMovies';

const HomeView: React.FC = () => (
  <BackdropImage src="https://a.ltrbxd.com/resized/sm/upload/ah/66/ey/4h/top-gun-maverick-1200-1200-675-675-crop-000000.jpg">
    <PageContent>
      <div className="relative flex flex-col items-center gap-2 mb-16">
        <Logo logoSize="lg" showLogo={false} showText />

        <p className="text-grey-200 text-xl text-center">
          Track films youve watched. <br />
          Save those you want to see. <br />
          Tell your friends whats good.
        </p>

        <span className="text-grey-300">
          The social network for movie lovers.
        </span>
      </div>

      <PopularMovies />

      <div className="flex flex-col gap-4">
        <Features />

        <div>
          <p className="text-grey-200 text-xl text-center mb-2">
            Write and share reviews. <br />
            Compile your own lists. <br />
            Share your life in film.
          </p>

          <span className="text-grey-300 text-center">
            Below are some popular reviews and lists from this week.
            <Link className="text-grey-100 mx-1" href="/">
              Sign up
            </Link>
            to create your own.
          </span>
        </div>

        <Card
          title="Popular reviews this week"
          link={{ href: '/' }}
          gap={false}
          noPadding
        >
          {/* {[1, 2, 3, 4, 5].map(r => (
            <UserMovieReviewBody key={r} preview />
          ))} */}
        </Card>

        {/* <Card title="Popular lists" link={{ href: '/' }} gap={false} noPadding>
          {[1, 2, 3, 4, 5].map(r => (
            <UserMovieList key={r} />
          ))}
        </Card> */}
      </div>
    </PageContent>
  </BackdropImage>
);

export default HomeView;
