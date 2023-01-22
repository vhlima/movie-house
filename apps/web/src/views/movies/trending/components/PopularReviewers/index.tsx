import { useAuth } from '../../../../../hooks/useAuth';

import Card from '../../../../../components/Card';

import Link from '../../../../../components/Link';

import SvgIcon from '../../../../../components/SvgIcon';

import ListItem from '../../../../../components/ListItem';

import Typography from '../../../../../components/Typography';

import QueryState from '../../../../../components/QueryState';

import ProfilePicture from '../../../../../components/ProfilePicture';
import { useFindUserQuery } from '../../../../../graphql';
import UserProfileLink from '../../../../../components/user/UserProfileLink';

const PopularReviewers: React.FC = () => {
  const { data, error } = useFindUserQuery({
    variables: { username: 'vhlima' },
  });

  const { id, username, profilePictureUrl } = data?.user || {};

  return (
    <Card title="Popular reviewers" noPadding>
      <QueryState loading={false} error={error}>
        {data && (
          <ul className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <ListItem
                className="flex items-center gap-2"
                key={`popular-reviewer-${id + index}`}
              >
                <ProfilePicture src={profilePictureUrl} imageSize="md" />

                <div className="w-full">
                  <UserProfileLink username={username}>
                    <Typography
                      className="font-semibold hover:text-grey-200"
                      component="h3"
                      color="primary"
                    >
                      {username}
                    </Typography>
                  </UserProfileLink>

                  <Link
                    href={{
                      pathname: '/users/[username]',
                      query: { username },
                    }}
                  >
                    <Typography
                      className="hover:text-grey-300"
                      component="small"
                      size="sm"
                    >
                      1,660 movies
                    </Typography>
                  </Link>

                  <Typography className="mx-1" component="span">
                    |
                  </Typography>

                  <Link
                    href={{
                      pathname: '/users/[username]',
                      query: { username },
                    }}
                  >
                    <Typography
                      className="hover:text-grey-300"
                      component="small"
                      size="sm"
                    >
                      1,259 reviews
                    </Typography>
                  </Link>
                </div>
              </ListItem>
            ))}
          </ul>
        )}
      </QueryState>
    </Card>
  );
};

export default PopularReviewers;
