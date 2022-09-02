import { gql } from '@apollo/client';

import { appendGql } from '../../utils';

const FEATURED_REVIEWS_FIELDS = gql`
  fragment FeaturedReviewsFields on Review {
    id
    body
    commentaryCount
    createdAt
    likes {
      user {
        id
      }
    }
    author {
      username
      profilePictureUrl
    }
    movie {
      originalTitle
      posterUrl
      releaseDate
    }
  }
`;

export const FIND_FEATURED_REVIEWS = appendGql(
  FEATURED_REVIEWS_FIELDS,
  gql`
    query FindFeaturedReviews($userId: String!) {
      featuredReviews(userId: $userId) {
        pinnedReviews {
          ...FeaturedReviewsFields
        }
        popularReviews {
          ...FeaturedReviewsFields
        }
        recentReviews {
          ...FeaturedReviewsFields
        }
      }
    }
  `,
);
