interface ErrorTextProps {
  text: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => (
  <h2 className="text-danger-base" data-testid="loading-error">
    {text}
  </h2>
);

export default ErrorText;
