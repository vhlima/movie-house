import type { PropsWithChildren } from 'react';

import Navbar from './components/Navbar';

import Footer from './components/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <div id="modalPortal" />

    <div className="flex flex-col relative w-screen h-screen overflow-x-hidden overflow-y-auto font-sans bg-grey-900">
      <Navbar />

      <main className="relative w-full mx-auto max-w-5xl sm:px-3 md:px-9 mb-4">
        {children}
      </main>

      <Footer />
    </div>
  </>
);

export default Layout;
