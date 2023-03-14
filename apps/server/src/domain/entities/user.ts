import { Timestamps } from './timestamps';

export class User extends Timestamps {
  id: string;

  providerId: string;

  username: string;

  realName?: string;

  biography?: string;

  profilePictureUrl?: string;
}
