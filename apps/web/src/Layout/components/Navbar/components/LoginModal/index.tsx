import { useSession, signIn, signOut } from 'next-auth/react';

import type { ModalHandles } from '../../../../../components/Modal';

import Button from '../../../../../components/Button';

import Modal from '../../../../../components/Modal';

import Typography from '../../../../../components/Typography';
import SvgIcon from '../../../../../components/SvgIcon';

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
            <Modal.Header>
              <Modal.Title text="Sign in" />

              <Typography component="h2">
                Choose your preferable way to sign in.
              </Typography>

              <Modal.CloseButton onClose={onClose} />
            </Modal.Header>

            <div className="flex gap-2">
              <Button
                className="flex gap-2"
                buttonStyle="secondary"
                onClick={() => signIn()}
              >
                <SvgIcon className="flex-shrink-0" iconType="FaUserAlt" />
                Sign in with GitHub
              </Button>

              <Button
                className="flex gap-2"
                buttonStyle="secondary"
                onClick={() => signIn()}
              >
                <SvgIcon className="flex-shrink-0" iconType="FaUserAlt" />
                Sign in using test account
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
