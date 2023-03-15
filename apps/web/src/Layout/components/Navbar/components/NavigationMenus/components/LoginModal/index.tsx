import { useAuth, signIn } from '@/hooks/useAuth';

import { Typography, Button, Modal, SvgIcon } from '@/components';

import type { ModalHandles } from '@/components';

type LoginModalProps = ModalHandles;

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { data: session } = useAuth();

  return (
    <Modal backdrop center onClose={onClose}>
      <div className="flex flex-col gap-2">
        {!session && (
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
                className="gap-2"
                intent="secondary"
                onClick={() => signIn()}
              >
                <SvgIcon className="flex-shrink-0" iconType="FaUserAlt" />
                Sign in with GitHub
              </Button>

              <Button
                className="gap-2"
                intent="secondary"
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
