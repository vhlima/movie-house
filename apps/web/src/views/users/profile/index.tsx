import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { useFindUserQuery } from '../../../graphql';

import type { ProfileContextData } from './hooks/useProfile';

import { ProfileContext } from './hooks/useProfile';

import Card from '../../../components/Card';

import FavoriteMovies from './components/FavoriteMovies';

import ProfileStats from './components/ProfileStats';

import ProfilePicture from '../../../components/ProfilePicture';

import PageContent from '../../../components/PageContent';

import BackdropImage from '../../../components/BackdropImage';

import ReviewsCards from './components/Reviews';

const UserProfileView: React.FC = () => {
  const { query } = useRouter();

  const { data } = useFindUserQuery({
    variables: { username: query.username as string },
  });

  const contextProvider = useMemo(
    () => ({ user: data?.user } as ProfileContextData),
    [data],
  );

  return (
    <BackdropImage src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg">
      <ProfileContext.Provider value={contextProvider}>
        <PageContent className="relative flex flex-col justify-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <ProfilePicture
              imageSize="lg"
              src={data?.user?.profilePictureUrl}
            />

            <div className="flex flex-grow flex-wrap items-center gap-x-2">
              <h1 className="text-grey-100 text-2xl font-semibold">
                {data?.user?.username}
              </h1>

              <div className="bg-movieHouse-mid rounded-md px-1">
                <span className="text-white text-sm">Patron</span>
              </div>
            </div>
          </div>

          <ProfileStats />

          <Card className="text-grey-200" title="About me" noPadding>
            {!data?.user?.biography ? (
              <p>
                {data?.user?.username} hasn&apos;t told us anything about him
                yet.
              </p>
            ) : (
              <p className="whitespace-pre-wrap">{data?.user.biography}</p>
            )}
          </Card>

          <FavoriteMovies />

          <ReviewsCards />
        </PageContent>
      </ProfileContext.Provider>
    </BackdropImage>
  );
};

export default UserProfileView;
