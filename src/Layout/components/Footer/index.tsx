import React from 'react';

import { FaGithub } from 'react-icons/fa';

import Link from '../../../components/Link';

const Footer: React.FC = () => {
  const hoverStyle = 'hover:text-movieHouse-dark';

  return (
    <footer className="flex flex-col items-center gap-4 p-4 mt-auto bg-grey-800 text-grey-200">
      <div className="flex justify-center gap-2 font-semibold">
        <Link className={hoverStyle} href="/">
          About
        </Link>
        <Link className={hoverStyle} href="/">
          News
        </Link>
        <Link className={hoverStyle} href="/">
          Help
        </Link>
        <Link className={hoverStyle} href="/">
          Terms
        </Link>
        <Link className={hoverStyle} href="/">
          Contact
        </Link>
      </div>

      <p className="text-center">
        © Movie House 2022
        <br />
        Made by Victor Almeida
        <br />
        All film data comes from TMDb
      </p>

      <div>
        <Link className={hoverStyle} href="https://github.com/vhlima">
          <FaGithub size={28} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
