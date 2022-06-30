import type { NextPage } from 'next';

import { MovieData } from '../types';

import * as fakeData from '../data/fake.json';

import Layout from '../Layout';

import Card from '../components/Card';

import MovieCarousel from '../components/MovieCarousel';
import UserMovieReview from '../components/UserMovieReview';

const Home: NextPage = () => (
  <Layout>
    <Card
      link={{ href: '/what-to-watch/fan-favorites' }}
      title="Top choices"
      description="Movies we think you might like"
    >
      <MovieCarousel movies={fakeData.movies as MovieData[]} />
    </Card>

    <Card title="Popular reviews this week">
      <UserMovieReview preview />
      <UserMovieReview preview />
      <UserMovieReview preview />
      <UserMovieReview preview />
    </Card>
  </Layout>
);

export default Home;
