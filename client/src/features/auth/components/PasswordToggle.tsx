import eyeCloseIcon from '@/assets/icons/eye-close.svg';
import eyeOpenIcon from '@/assets/icons/eye-open.svg';

interface PasswordToggleProps {
  show: boolean;
  onToggle: () => void;
}

export default function PasswordToggle({ show, onToggle }: PasswordToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute p-0 bg-transparent border-none cursor-pointer right-4 top-11"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      <img
        src={show ? eyeOpenIcon : eyeCloseIcon}
        alt=""
        className="pointer-events-none"
      />
    </button>
  );
}
