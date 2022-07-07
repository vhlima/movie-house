import type { NextPage } from 'next';

import { movieList } from '../data/fakeData';

import Card from '../components/Card';

import Logo from '../components/Logo';

import FeatureLink from '../views/home/FeatureLink';

import BackgroundImage from '../components/BackgroundImage';

import UserMovieReview from '../components/UserMovieReview';

import UserListPreview from '../components/UserListPreview';

import MovieCarousel from '../components/MovieCarousel';

import Link from '../components/Link';

const Home: NextPage = () => (
  <div className="flex">
    <BackgroundImage src="https://a.ltrbxd.com/resized/sm/upload/ah/66/ey/4h/top-gun-maverick-1200-1200-675-675-crop-000000.jpg" />

    <div className="w-full mt-32 z-10 p-3">
      <div className="flex flex-col items-center gap-2 mb-16">
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

      <div className="flex flex-col gap-4">
        <Card title="Features you will love" noPadding>
          <FeatureLink
            href="/"
            iconType="IoEye"
            color="green"
            text="Keep track of every film youve ever watched (or just start from the day you join)"
          />

          <FeatureLink
            href="/"
            iconType="AiFillHeart"
            color="orange"
            text="Show some love for your favorite movies, lists and reviews by liking, commenting and reviewing"
          />

          <FeatureLink
            href="/"
            iconType="IoList"
            color="purple"
            text="Write and share reviews, and follow friends and other members to read theirs"
          />

          <FeatureLink
            href="/"
            iconType="AiFillStar"
            color="green"
            text="Rate each film on a ten-star scale (with halves) to record and share your reaction"
          />

          <FeatureLink
            href="/"
            iconType="AiOutlineCalendar"
            color="orange"
            text="Keep a diary of your film watching"
          />

          <FeatureLink
            href="/"
            iconType="AiFillHeart"
            color="purple"
            text="Compile and share lists of films on any topic and keep a watchlist of films to see"
          />
        </Card>

        <Card
          title="Top choices"
          description="Movies we think you might like"
          link={{ href: '/what-to-watch/fan-favorites' }}
          noPadding
        >
          <MovieCarousel movies={movieList} />
        </Card>

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
          {[1, 2, 3, 4, 5].map(r => (
            <UserMovieReview key={r} preview />
          ))}
        </Card>

        <Card title="Popular lists" link={{ href: '/' }} gap={false} noPadding>
          {[1, 2, 3, 4, 5].map(r => (
            <UserListPreview key={r} />
          ))}
        </Card>
      </div>

      {/* <Card title="Popular reviews this week">
          <UserMovieReview preview />
          <UserMovieReview preview />
          <UserMovieReview preview />
          <UserMovieReview preview />
        </Card>  */}
    </div>
  </div>
);

export default Home;
