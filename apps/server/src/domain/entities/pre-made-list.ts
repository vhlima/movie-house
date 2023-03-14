import { PreMadeListType } from '../enums';
import { Timestamps } from './timestamps';

export class PreMadeList extends Timestamps {
  id: string;

  userId: string;

  listType: PreMadeListType;
}
