interface ValidationErrorProps {
  isTouched: boolean;
  value: string;
  errorMessage: string;
}

const ValidationError: React.FC<ValidationErrorProps> = ({
  isTouched,
  value,
  errorMessage,
}) => {
  if (!isTouched || value) {
    return null;
  }

  return <span className="text-red-500 text-sm">{errorMessage}</span>;
};

export default ValidationError;
