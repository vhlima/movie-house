import Link from '../../../components/Link';
import SvgIcon from '../../../components/SvgIcon';
import Typography from '../../../components/Typography';
import PageContent from '../../../components/PageContent';

import NavigationMenus from './components/NavigationMenus';

const Navbar: React.FC = () => (
  <nav className="bg-grey-800">
    <PageContent className="flex items-center gap-2 py-4 relative mx-auto max-w-5xl z-50">
      <Link className="flex items-center gap-2 select-none" href="/">
        <SvgIcon
          className="text-movieHouse-dark"
          iconType="BsHouse"
          size={24}
          strokeWidth={1}
        />

        <Typography
          className="font-mono font-bold"
          component="h1"
          color="primary"
          size="2xl"
        >
          MovieHouse
        </Typography>
      </Link>

      <NavigationMenus />
    </PageContent>
  </nav>
);

export default Navbar;
