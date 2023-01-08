import { gql } from '@apollo/client';

export const FIND_USER_PROFILE_STATS = gql`
  query FindUserProfileStats($userId: String!) {
    userProfileStats(userId: $userId) {
      followerCount
      followingCount
      listCount
      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;

const FEATURED_REVIEW_FIELDS = gql`
  fragment FeaturedReviewFields on Review {
    id
    body
    commentaryCount
    createdAt
    author {
      username
      profilePictureUrl
    }
    likes {
      user {
        id
      }
    }
    movie {
      id
      originalTitle
      posterUrl
      releaseDate
    }
  }
`;

export const FIND_USER_PROFILE_FEATURED_REVIEWS = gql`
  ${FEATURED_REVIEW_FIELDS}

  query FindUserProfileFeaturedReviews($userId: String!) {
    userProfileFeaturedReviews(userId: $userId) {
      popularReviews {
        ...FeaturedReviewFields
      }

      recentReviews {
        ...FeaturedReviewFields
      }

      pinnedReviews {
        ...FeaturedReviewFields
      }
    }
  }
`;
