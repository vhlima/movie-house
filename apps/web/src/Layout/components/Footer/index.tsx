import { Typography } from '@/components';
import { Link } from '../../../components/Link';
import SvgIcon from '../../../components/SvgIcon';

const Footer: React.FC = () => (
  <footer className="w-full flex flex-col items-center gap-4 p-4 pb-96 mt-auto bg-grey-800">
    <Link
      className="font-semibold transition-colors text-grey-200 hover:text-grey-300"
      href="/"
    >
      Contact
    </Link>

    <Typography className="text-center" component="p" color="primary">
      © Movie House 2023
      <br />
      Made by Victor Hugo Lima
      <br />
      All film data comes from TMDb
    </Typography>

    <Link
      className="transition-colors text-grey-200 hover:text-grey-300"
      href="https://github.com/vhlima"
    >
      <SvgIcon iconType="FaGithub" size={28} />
    </Link>
  </footer>
);

export default Footer;
