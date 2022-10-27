import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import client from '../../../api';

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const defaultProps = { props: {} };

//   const { page } = params;

//   if (!page && typeof page !== 'string') return defaultProps;

//   const pageNumber = parseInt(page as string, 10);

//   if (typeof pageNumber !== 'number') return defaultProps;

//   console.log(`page number? ${pageNumber}`);

//   const { data } = await client.query<
//     FindFullMovieQuery,
//     FindFullMovieQueryVariables
//   >({
//     query: FindFullMovieDocument,
//     variables: { movieId },
//   });

//   return {
//     props: {
//       abc: true,
//       // movie: data.movie,
//     },
//   };

//   return defaultProps;
// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const a = 1;

  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

const MoviesTrendingPage: NextPage = () => <h1>teste</h1>;

export default MoviesTrendingPage;
