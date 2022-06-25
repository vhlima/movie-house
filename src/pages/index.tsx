import type { NextPage } from 'next';

import { movieList } from '../data/fakeData';

import Layout from '../Layout';

import Card from '../components/Card';

import MovieCarousel from '../components/MovieCarousel';

const Home: NextPage = () => (
  <Layout>
    <Card title="Top choices" description="Movies we think you might like">
      <MovieCarousel movies={movieList} />
    </Card>
  </Layout>
);

export default Home;
