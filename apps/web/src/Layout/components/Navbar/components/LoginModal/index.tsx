import { useSession, signIn, signOut } from 'next-auth/react';

import type { ModalHandles } from '../../../../../components/Modal';

import Button from '../../../../../components/Button';

import Modal from '../../../../../components/Modal';

import Typography from '../../../../../components/Typography';

type LoginModalProps = ModalHandles;

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { data } = useSession();

  return (
    <Modal backdrop center onClose={onClose}>
      <div className="flex flex-col gap-2">
        {data ? (
          <>
            <Typography component="h1">You are already signed in</Typography>

            <Button
              type="button"
              buttonStyle="danger"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Typography component="h1">
              Please, click the button below to sign in
            </Typography>

            <Button buttonStyle="primary" onClick={() => signIn()}>
              Sign In using GitHub
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
