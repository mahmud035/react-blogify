import { cn } from './cn';

/** Shared text-input styling with an error variant. */
export function inputClass(hasError?: boolean): string {
  return cn(
    'w-full p-3 bg-background border rounded-md focus:outline-none transition-colors',
    hasError
      ? 'border-danger focus:border-danger'
      : 'border-white/20 focus:border-primary',
  );
}
