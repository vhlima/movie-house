/* User */
export interface UserData {
  _id: string;
  username: string;
  realName: string;
  profilePicture: string;
  followers: string[];
  following: string[];
}

/* Actor */
export interface ActorProps {
  id: string;
  name: string;
  photoUrl: string;
}

/* Movie */
type CrewRole = 'Director' | 'Writer';

export interface MovieCategory {
  id: string;
  name: string;
}

export interface MovieCrewProps {
  id: string;
  name: string;
  role: CrewRole[];
}

export interface MovieData {
  id: string;
  name: string;
  spoiler: string;
  duration: string;
  rating: number;
  coverUrl: string;
  backgroundUrl: string;
  ageRestriction: number;
  crew: MovieCrewProps[];
  releaseDate: {
    day: string;
    month: string;
    year: string;
  };
  categories: MovieCategory[];
  cast: Array<ActorProps & { role: string }>;
}

/* Authentication */
export interface SignInCredentials {
  username: string;
}
