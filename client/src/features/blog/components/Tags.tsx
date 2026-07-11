interface TagsProps {
  tags: string[];
}

export default function Tags({ tags }: TagsProps) {
  if (!tags?.length) return null;
  return (
    <ul className="tags">
      {tags.map((tag, index) => (
        <li key={`${tag}-${index}`}>{tag}</li>
      ))}
    </ul>
  );
}
