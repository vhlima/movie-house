import { useProfile } from '../../hooks/useProfile';

import Stats from './components/Stats';

const ProfileStats: React.FC = () => {
  const { user } = useProfile();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex">
        <Stats link={{ href: '/' }} number={1595} text="Movies" />

        <Stats link={{ href: '/' }} number={118} text="This year" />

        <Stats link={{ href: '/' }} number={48} text="Lists" />
      </div>

      <div className="flex">
        <Stats link={{ href: '/' }} number={138} text="Following" />

        <Stats link={{ href: '/' }} number={116943} text="Followers" />
      </div>
    </div>
  );
};

export default ProfileStats;
