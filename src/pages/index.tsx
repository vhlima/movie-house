import type { NextPage } from 'next';

import { movieList } from '../data/fakeData';

import Layout from '../Layout';

import Card from '../components/Card';

import MovieCarousel from '../components/MovieCarousel';
import MovieReview from '../components/MovieReview';

const Home: NextPage = () => (
  <Layout>
    <Card
      link={{ href: '/what-to-watch/fan-favorites' }}
      title="Top choices"
      description="Movies we think you might like"
    >
      <MovieCarousel movies={movieList} />
    </Card>

    <Card title="Popular reviews this week">
      <MovieReview />
      <MovieReview />
      <MovieReview />
    </Card>
  </Layout>
);

export default Home;
