import { DatasourceContext } from '../api';

import User from '../entities/postgres/user.interface';

export interface ServerContext extends DatasourceContext {
  user?: User;
}
