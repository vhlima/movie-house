import { Formik, Form } from 'formik';

import type { ModalHandles } from '../../../../../components/Modal';

import Modal from '../../../../../components/Modal';

import Input from '../../../../../components/Input';

import Button from '../../../../../components/Button';

import { useLogic } from './logic';

const AuthenticationModal: React.FC<ModalHandles> = ({ onClose }) => {
  const { handleSubmit } = useLogic({ onClose });

  return (
    <Modal className="w-11/12 rounded-md" center backdrop onClose={onClose}>
      <Formik initialValues={{ username: '' }} onSubmit={handleSubmit}>
        <Form className="flex flex-col gap-2">
          <Input
            formik
            name="username"
            placeholder="Username"
            leftIcon={{ className: 'p-2', icon: 'HiMail' }}
            inputStyle="secondary"
            label={{ text: 'Username', htmlFor: true }}
          />

          <div className="flex gap-1">
            <span className="text-grey-200">Forgot your password?</span>

            <span className="text-grey-100 cursor-pointer hover:text-grey-200">
              Reset here
            </span>
          </div>

          <div className="flex gap-1">
            <span className="text-grey-200">Dont have an account?</span>

            <span className="text-grey-100 cursor-pointer hover:text-grey-200">
              Register now
            </span>
          </div>

          <Button type="submit">Login</Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AuthenticationModal;
