import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import PopularMoviesView from '../../../views/movies/popular';

const PopularMovies: NextPage = () => <PopularMoviesView />;

export default PopularMovies;
