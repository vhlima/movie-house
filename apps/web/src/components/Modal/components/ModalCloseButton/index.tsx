import { SvgIcon } from '@/components';

interface ModalCloseButtonProps {
  onClose: () => void;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClose }) => (
  <button className="absolute right-0 top-0" type="button" onClick={onClose}>
    <SvgIcon className="text-danger-base" iconType="FiX" size={28} />
  </button>
);
export default ModalCloseButton;
