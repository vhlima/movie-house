import type { NextPage } from 'next';

import Card from '../components/Card';

import Logo from '../components/Logo';

import FeatureLink from '../views/home/FeatureLink';

import BackgroundImage from '../components/BackgroundImage';

import Layout from '../Layout';

const Home: NextPage = () => (
  <Layout>
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

        <div>
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
        </div>

        {/* <Card
          title="Top choices"
          description="Movies we think you might like"
          link={{ href: '/what-to-watch/fan-favorites' }}
        >
          <MovieCarousel movies={fakeData.movies as MovieData[]} />
        </Card>

        <Card title="Popular reviews this week">
          <UserMovieReview preview />
          <UserMovieReview preview />
          <UserMovieReview preview />
          <UserMovieReview preview />
        </Card> */}
      </div>
    </div>
  </Layout>
);

export default Home;
