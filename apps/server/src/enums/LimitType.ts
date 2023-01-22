import { registerEnumType } from 'type-graphql';

enum LimitType {
  MAX_FAVORITE_MOVIES = 'MAX_FAVORITE_MOVIES',
  MAX_PINNED_REVIEWS = 'MAX_PINNED_REVIEWS',
  MAX_FEATURED_REVIEWS = 'MAX_FEATURED_REVIEWS',
}

registerEnumType(LimitType, {
  name: 'LimitType',
  description: 'User list type defines wich category is that list in',
});

export default LimitType;
