import React from 'react';

import { FaGithub } from 'react-icons/fa';

import Link from '../../../components/Link';

const Footer: React.FC = () => {
  const linkStyles = 'hover:text-primary';

  return (
    <footer className="flex flex-col items-center gap-4 p-4 mt-auto bg-complementary text-secondary">
      <div className="flex justify-center gap-2 font-semibold">
        <Link className={linkStyles} href="/">
          About
        </Link>
        <Link className={linkStyles} href="/">
          News
        </Link>
        <Link className={linkStyles} href="/">
          Help
        </Link>
        <Link className={linkStyles} href="/">
          Terms
        </Link>
        <Link className={linkStyles} href="/">
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
        <Link className="hover:text-primary" href="https://github.com/vhlima">
          <FaGithub size={28} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
