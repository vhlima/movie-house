import { Formik, Form } from 'formik';

import type { CreateReviewPageProps } from '../../../pages/reviews/create';

import { useLogic } from './logic';

import Card from '../../../components/Card';

import Input from '../../../components/Input';

import Button from '../../../components/Button';

import MovieInfo from '../../movies/components/Info';

import MovieCover from '../../movies/components/Cover';

import MovieSearchModal from '../../movies/components/SearchModal';

const CreateReviewView: React.FC<CreateReviewPageProps> = ({ movie }) => {
  const {
    validationSchema,
    selectedMovie,
    reviewMutationResult,
    isSearch,
    openSearch,
    closeSearch,
    handleSelect,
    handleSubmit,
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

      <Card title="Write you review">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {!selectedMovie ? (
              <>
                <MovieCover coverSize="sm" />

                <div>
                  <h1 className="text-grey-100 text-lg whitespace-nowrap">
                    No movie selected
                  </h1>

                  <p className="text-grey-200">
                    Select the movie you want to review
                  </p>
                </div>
              </>
            ) : (
              <MovieInfo movie={selectedMovie} />
            )}
          </div>

          <Button buttonStyle="secondary" onClick={openSearch}>
            {!selectedMovie ? 'Select movie' : 'Change movie'}
          </Button>
        </div>

        <Formik
          initialValues={{ body: '' }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-2">
            {reviewMutationResult.error && (
              <span className="text-error-mid">
                {reviewMutationResult.error.message}
              </span>
            )}

            <Input
              className="h-36"
              formik
              textarea
              name="body"
              label={{ text: 'Your review:', htmlFor: true }}
            />

            <Button
              type="submit"
              disabled={!selectedMovie || reviewMutationResult.loading}
            >
              Post review
            </Button>
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default CreateReviewView;
