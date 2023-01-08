import { useState } from 'react';

import type { ModalHandles } from '../../../../Modal';

import { useLogic } from './logic';

import Modal from '../../../../Modal';

import Typography from '../../../../Typography';

import SvgIcon from '../../../../SvgIcon';

import Button from '../../../../Button';

import Input from '../../../../Input';

import ErrorText from '../../../../ErrorText';

import UserLists from './components/UserLists';

import CreateMovieListModal from './components/CreateMovieListModal';

interface AddMovieToListModalProps extends ModalHandles {
  movieId: number;
}

const AddMovieToListModal: React.FC<AddMovieToListModalProps> = ({
  movieId,
  onClose,
}) => {
  const {
    addMovieToCustomListResult: { error },
    handleAddMovieToList,
  } = useLogic({
    onClose,
  });

  const [searchParams, setSearchParams] = useState<string>();

  const [isCreatingNewList, setCreatingNewList] = useState<boolean>(false);

  if (isCreatingNewList) {
    return <CreateMovieListModal onClose={() => setCreatingNewList(false)} />;
  }

  return (
    <Modal
      className="overflow-hidden"
      center
      backdrop
      showX={false}
      autoStyle={false}
      onClose={onClose}
    >
      <div className="border-b border-b-grey-700">
        <Button
          className="p-2"
          buttonStyle="tertiary"
          buttonSize="none"
          border={false}
          rounded={false}
          onClick={onClose}
        >
          <div className="flex items-center gap-2 mr-auto">
            <SvgIcon className="text-grey-400" iconType="FaChevronLeft" />

            <Typography className="font-bold" component="span" color="primary">
              Back
            </Typography>
          </div>
        </Button>
      </div>

      <div className="p-2">
        <Input
          name="searchParams"
          placeholder="Search"
          inputStyle="secondary"
          inputSize="md"
          leftIcon={{
            className: 'px-2 py-1',
            icon: {
              iconType: 'FaSearch',
              size: 18,
            },
          }}
          onChange={e => setSearchParams(e.target.value)}
        />
      </div>

      <div className="border-b border-b-grey-700">
        <Button
          className="flex gap-2 p-2 items-center"
          buttonStyle="tertiary"
          buttonSize="none"
          flex={false}
          border={false}
          rounded={false}
          onClick={() => setCreatingNewList(true)}
        >
          <SvgIcon iconType="BsPlusLg" />

          <Typography component="span" color="secondary">
            New list
          </Typography>
        </Button>
      </div>

      {error && (
        <div className="p-2">
          <ErrorText text={error.message} />
        </div>
      )}

      <UserLists
        searchParams={searchParams}
        onClick={listId => handleAddMovieToList(listId, movieId)}
      />
    </Modal>
  );
};

export default AddMovieToListModal;
