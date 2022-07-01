import type { NextPage } from 'next';

import { movieList } from '../../../data/fakeData';

import Layout from '../../../Layout';

import MovieCarousel from '../../../components/MovieCarousel';

const FanFavorites: NextPage = () => (
  <Layout>
    <MovieCarousel movies={movieList} />
  </Layout>
);

export default FanFavorites;
