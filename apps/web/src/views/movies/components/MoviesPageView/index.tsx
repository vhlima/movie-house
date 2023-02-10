import { useRouter } from 'next/router';

import type { PropsWithChildren } from 'react';

import Input from '../../../../components/Input';

import MovieSearchInput from '../../../../components/movie/MovieSearchInput';

import SortNavigation from './components/SortNavigation';

const MoviesPageView: React.FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();

  return (
    <div className="flex flex-col gap-8 mt-16">
      <section className="flex flex-col items-center lg:flex-row">
        <SortNavigation />

        <div className="mt-4 lg:mt-0 lg:ml-auto">
          <Input.Label
            className="flex flex-col lg:flex-row items-center uppercase text-sm gap-2"
            text="Find a film"
            htmlFor="searchMovie"
            formik={false}
          >
            <MovieSearchInput
              dropdown
              onSelectMovie={movie =>
                push({
                  pathname: '/movies/[id]',
                  query: { id: movie.id },
                })
              }
            />
          </Input.Label>
        </div>
      </section>

      {children}
    </div>
  );
};

export default MoviesPageView;
