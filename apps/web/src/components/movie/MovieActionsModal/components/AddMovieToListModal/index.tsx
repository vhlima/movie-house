import { useState } from 'react';

import { Typography } from '@/components';
import type { ModalHandles } from '../../../../Modal';

import { useLogic } from './logic';

import Modal from '../../../../Modal';
import Input from '../../../../Input';
import Button from '../../../../Button';
import SvgIcon from '../../../../SvgIcon';

import UserLists from './components/UserLists';
import CreateMovieListModal from './components/CreateMovieListModal';

interface AddMovieToListModalProps extends ModalHandles {
  movieId: number;
}

const AddMovieToListModal: React.FC<AddMovieToListModalProps> = ({
  movieId,
  onClose,
}) => {
  const { handleAddMovieToList } = useLogic();

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
      autoStyle={false}
      onClose={onClose}
    >
      <Button
        className="p-2 border-b border-b-grey-700"
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

      <Input.Container className="m-2" styleType="secondary" borderFocus="none">
        <Input
          id="searchParams"
          placeholder="Search"
          formik={false}
          onChange={e => setSearchParams(e.target.value)}
        />

        <Input.Icon iconType="FaSearch" size={18} direction="left" />
      </Input.Container>

      <Button
        className="flex gap-2 p-2 items-center border-b border-b-grey-700"
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

      <UserLists
        filter={searchParams}
        onClick={async listId => {
          const success = await handleAddMovieToList(listId, movieId);

          if (success) {
            onClose();
          }
        }}
      />
    </Modal>
  );
};

export default AddMovieToListModal;
