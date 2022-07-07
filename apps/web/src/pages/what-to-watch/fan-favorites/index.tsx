import type { NextPage } from 'next';

import { movieList } from '../../../data/fakeData';

import MovieCarousel from '../../../components/MovieCarousel';

const FanFavorites: NextPage = () => <MovieCarousel movies={movieList} />;

export default FanFavorites;
