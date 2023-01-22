interface ErrorTextProps {
  text: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => (
  <h1 className="text-danger-base" data-testid="loading-error">
    {text}
  </h1>
);

export default ErrorText;
