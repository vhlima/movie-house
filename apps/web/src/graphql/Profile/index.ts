import { gql } from '@apollo/client';

export const FIND_USER_PROFILE = gql`
  query FindUserProfile($userId: String!) {
    userProfile(userId: $userId) @connection(key: "userProfile") {
      followerCount
      followingCount

      listCount

      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;

export const PIN_REVIEW = gql`
  mutation PinReview($reviewId: String!) {
    pinReview(reviewId: $reviewId) {
      id
      body
      pinned
      commentaryCount
      createdAt
      likes {
        id
        user {
          id
          username
        }
      }
      author {
        id
        username
        profilePictureUrl
      }
      movie {
        id
        originalTitle
        posterUrl
        releaseDate
      }
    }
  }
`;
