import React from 'react';

import { FaGithub } from 'react-icons/fa';

import Link from '../../../components/Link';

const Footer: React.FC = () => (
  <div className="flex flex-col items-center gap-4 p-4 mt-auto bg-complementary text-secondary">
    <div className="flex justify-center gap-2 font-semibold">
      <Link href="/">About</Link>
      <Link href="/">News</Link>
      <Link href="/">Help</Link>
      <Link href="/">Terms</Link>
      <Link href="/">Contact</Link>
    </div>

    <p className="text-center">
      © Movie House 2022
      <br />
      Made by Victor Almeida
      <br />
      All film data comes from TMDb
    </p>

    <div>
      <Link href="https://github.com/vhlima">
        <FaGithub size={28} />
      </Link>
    </div>
  </div>
);

export default Footer;
