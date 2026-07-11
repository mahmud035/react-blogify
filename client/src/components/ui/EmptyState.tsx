interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="py-8 text-2xl italic text-center text-muted">
      <p>{message}</p>
    </div>
  );
}
