import { DatasourceContext } from '../api';

import User from '../entities/pg-entities/user.interface';

export interface ServerContext extends DatasourceContext {
  user?: User;
}
