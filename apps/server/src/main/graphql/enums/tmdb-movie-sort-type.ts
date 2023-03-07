import { registerEnumType } from 'type-graphql';

import { TmDBMovieSortType } from '../../../data/enums';

export { TmDBMovieSortType };

registerEnumType(TmDBMovieSortType, {
  name: 'TmDBMovieSortType',
  description: 'Tmdb sort type enum',
});
