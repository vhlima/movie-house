import type { NextPage } from 'next';

import { movieList } from '../../../data/fakeData';

import MovieCarousel from '../../../views/movies/components/Carousel';

const FanFavorites: NextPage = () => <MovieCarousel movies={movieList} />;

export default FanFavorites;
