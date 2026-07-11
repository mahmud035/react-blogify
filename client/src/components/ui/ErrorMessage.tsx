interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-140px)] mx-auto max-w-[500px] italic">
      <p className="p-8 text-2xl text-center rounded-md text-danger bg-danger/10">
        Something went wrong{message ? `: “${message}”` : ''}. Please try again.
      </p>
    </div>
  );
}
