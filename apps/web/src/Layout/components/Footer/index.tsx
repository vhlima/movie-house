import Link from '../../../components/Link';

import SvgIcon from '../../../components/SvgIcon';
import Typography from '../../../components/Typography';

const Footer: React.FC = () => {
  const hoverStyle = 'hover:text-grey-300';

  return (
    <footer className="flex flex-col items-center gap-4 p-4 mt-8 bg-grey-800 text-grey-200">
      <div className="flex justify-center gap-2 font-semibold">
        <Link className={hoverStyle} href="/">
          Contact
        </Link>
      </div>

      <Typography className="text-center" component="p" color="primary">
        © Movie House 2023
        <br />
        Made by Victor Hugo Lima
        <br />
        All film data comes from TMDb
      </Typography>

      <div>
        <Link className={hoverStyle} href="https://github.com/vhlima">
          <SvgIcon iconType="FaGithub" size={28} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
