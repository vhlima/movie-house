import SvgIcon from '../../../SvgIcon';

interface ModalCloseButtonProps {
  onClose: () => void;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClose }) => (
  <button className="absolute right-0 top-0" type="button" onClick={onClose}>
    <SvgIcon className="text-danger-light" iconType="FiX" size={28} />
  </button>
);
export default ModalCloseButton;
