import { useState } from 'react';

import { Typography, Button, Input, Modal, SvgIcon } from '@/components';
import type { ModalHandles } from '@/components';

import { useLogic } from './logic';

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
        className="gap-2 px-0 border-b border-b-grey-700"
        intent="tertiary"
        center={false}
        rounded={false}
        onClick={onClose}
      >
        <SvgIcon className="ml-2" iconType="FaChevronLeft" />

        <Typography className="font-bold" component="span" color="primary">
          Back
        </Typography>
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
        className="gap-2 px-0 border-b border-b-grey-700"
        intent="tertiary"
        rounded={false}
        center={false}
        onClick={() => setCreatingNewList(true)}
      >
        <SvgIcon className="ml-2" iconType="BsPlusLg" />

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
