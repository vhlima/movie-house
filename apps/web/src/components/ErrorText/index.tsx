interface ErrorTextProps {
  text: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => (
  <h1 className="text-danger-base">{text}</h1>
);

export default ErrorText;
