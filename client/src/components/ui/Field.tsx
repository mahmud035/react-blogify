import type { ReactNode } from 'react';
import type { FieldError } from 'react-hook-form';

interface FieldProps {
  label?: string;
  htmlFor?: string;
  error?: FieldError;
  children: ReactNode;
}

/** Labelled form field with an inline validation message. */
export default function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="w-full mb-6">
      {label && (
        <label htmlFor={htmlFor} className="block mb-2">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p role="alert" className="pt-1 text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
}
