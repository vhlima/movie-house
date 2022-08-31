import type { PropsWithChildren } from 'react';

import Navbar from './components/Navbar';

import Footer from './components/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <div id="modalPortal" />

    <div className="flex flex-col relative w-screen h-screen overflow-x-hidden overflow-y-auto font-sans bg-grey-900 overflow-scroll">
      <Navbar />

      <div className="relative w-full">{children}</div>

      <Footer />
    </div>
  </>
);

export default Layout;
