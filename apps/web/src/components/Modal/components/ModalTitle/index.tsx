import { Typography } from '@/components';

interface ModalTitleProps {
  text: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <Typography
    className="font-bold uppercase"
    component="h1"
    size="xl"
    color="primary"
  >
    {text}
  </Typography>
);

export default ModalTitle;
