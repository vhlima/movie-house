import { useSession, signIn, signOut } from 'next-auth/react';

import type { ModalHandles } from '../../../../../components/Modal';

import Modal from '../../../../../components/Modal';

type LoginModalProps = ModalHandles;

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { data } = useSession();

  return (
    <Modal backdrop center onClose={onClose}>
      {data ? (
        <>
          <h1>already logged in</h1>
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <div>
          <h1>login modal</h1>

          <button type="button" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      )}
    </Modal>
  );
};

export default LoginModal;
