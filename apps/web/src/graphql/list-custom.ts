import { gql } from '@apollo/client';

export const ADD_MOVIE_TO_CUSTOM_LIST = gql`
  mutation AddMovieToCustomList($movieId: Int!, $listId: String!) {
    addMovieToCustomList(movieId: $movieId, listId: $listId) {
      movie {
        originalTitle
      }
    }
  }
`;
