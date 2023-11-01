import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
  isVisible?: boolean;
}

const Alert = ({ isVisible, children, onClose }: Props) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
