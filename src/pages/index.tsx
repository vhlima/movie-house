import type { NextPage } from 'next';

import Card from '../components/Card';

import CarouselMovieList from '../components/CarouselMovieList';

import Layout from '../Layout';

const Home: NextPage = () => (
  <Layout>
    <Card title="Top choices" description="Movies we think you might like">
      <CarouselMovieList />
    </Card>
  </Layout>
);

export default Home;
