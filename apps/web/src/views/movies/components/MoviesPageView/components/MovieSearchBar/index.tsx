import { useRouter } from 'next/router';

import { Input } from '@/components';

import { MovieSearchInput } from '@/components/movie';

export const MovieSearchBar: React.FC = () => {
  const { push } = useRouter();

  return (
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
  );
};
