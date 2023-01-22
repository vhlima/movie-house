import { gql } from '@apollo/client';

export const ADD_MOVIE_TO_PRE_MADE_LIST = gql`
  mutation AddMovieToPreMadeList($listType: PreMadeListType!, $movieId: Int!) {
    userPreMadeListAddMovie(listType: $listType, movieId: $movieId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const REMOVE_MOVIE_FROM_PRE_MADE_LIST = gql`
  mutation RemoveMovieFromPreMadeList(
    $listType: PreMadeListType!
    $movieId: Int!
  ) {
    userPreMadeListRemoveMovie(listType: $listType, movieId: $movieId)
  }
`;
