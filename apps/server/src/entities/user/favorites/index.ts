import { getModelForClass } from '@typegoose/typegoose';

import FavoriteMovies from './favorites.interface';

export const FavoritesModel = getModelForClass(FavoriteMovies);

export default FavoriteMovies;
