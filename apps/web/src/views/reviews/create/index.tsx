import { Formik, Form } from 'formik';

import type { CreateReviewPageProps } from '../../../pages/reviews/create';

import { useLogic } from './logic';

import Link from '../../../components/Link';

import Card from '../../../components/Card';

import Input from '../../../components/Input';

import Button from '../../../components/Button';

import ErrorText from '../../../components/ErrorText';

import MovieCover from '../../movies/components/Cover';

import TextShorter from '../../../components/TextShorter';

import MovieSearchModal from '../../movies/components/SearchModal';

const CreateReviewView: React.FC<CreateReviewPageProps> = ({ movie }) => {
  const {
    loading,
    error,

    validationSchema,
    handleSubmit,

    selectedMovie,
    handleSelect,

    isSearch,
    openSearch,
    closeSearch,
  } = useLogic({ movie });

  return (
    <>
      {isSearch && (
        <MovieSearchModal
          title="Search a movie to review"
          onSelect={handleSelect}
          onClose={closeSearch}
        />
      )}

      <Card title="Write your review">
        <div className="flex gap-2">
          <MovieCover coverSize="sm" coverUrl={selectedMovie?.posterUrl} />

          <div className="flex flex-col gap-2 w-full">
            {!selectedMovie ? (
              <div>
                <h1 className="text-grey-100 text-lg whitespace-nowrap">
                  No movie selected
                </h1>

                <p className="text-grey-200">
                  Select the movie you want to review
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-x-1 flex-wrap">
                  <Link
                    className="text-grey-100 text-xl font-semibold hover:text-grey-300"
                    href="/"
                  >
                    {selectedMovie.originalTitle}
                  </Link>

                  <span className="text-grey-200">
                    ({new Date(selectedMovie.releaseDate).getFullYear()})
                  </span>
                </div>

                <TextShorter
                  className="text-grey-200"
                  text={selectedMovie.overview}
                  maxCharacters={100}
                />
              </div>
            )}

            <Button
              className="mt-auto"
              buttonStyle="secondary"
              onClick={openSearch}
            >
              {!selectedMovie ? 'Select movie' : 'Change movie'}
            </Button>
          </div>
        </div>

        <Formik
          initialValues={{ body: '' }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-2">
            {error && <ErrorText text={error.message} />}

            <Input
              formik
              name="body"
              rows={4}
              autoGrow={{ maxHeight: 250 }}
              label={{ text: 'Your review:', htmlFor: true }}
            />

            <Button type="submit" disabled={!selectedMovie || loading}>
              Post review
            </Button>
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default CreateReviewView;
