import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Field from '@/components/ui/Field';
import { getThumbnailUrl } from '@/utils/media';
import { blogSchema, type BlogFormValues } from '../blog.schema';

interface BlogFormProps {
  mode: 'create' | 'edit';
  defaultValues?: BlogFormValues;
  existingThumbnail?: string | null;
  isPending: boolean;
  submitLabel: string;
  /** Receives the assembled multipart body (title, tags, content, thumbnail?). */
  onSubmit: (formData: FormData) => void;
}

export default function BlogForm({
  mode,
  defaultValues,
  existingThumbnail,
  isPending,
  submitLabel,
  onSubmit,
}: BlogFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    existingThumbnail ?? null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: defaultValues ?? { title: '', tags: '', content: '' },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    toast.success('Image ready to upload');
  };

  const submit = handleSubmit((values) => {
    if (mode === 'create' && !file) {
      toast.error('Blog image is required');
      return;
    }
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('tags', values.tags);
    formData.append('content', values.content);
    if (file) formData.append('thumbnail', file);
    onSubmit(formData);
  });

  return (
    <form onSubmit={submit} className="create-blog">
      <div
        style={preview ? { backgroundImage: `url(${getThumbnailUrl(preview)})` } : undefined}
        className="grid place-items-center bg-slate-600/20 bg-cover bg-center h-[150px] rounded-md my-4"
      >
        <label
          htmlFor="thumbnail"
          className="flex items-center gap-2 px-2 py-1 transition-all rounded-md cursor-pointer bg-background hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
            />
          </svg>
          <span className="font-medium text-white">
            {preview ? 'Change Image' : 'Upload Your Image'}
          </span>
          <input
            id="thumbnail"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <Field error={errors.title}>
        <input
          {...register('title')}
          type="text"
          placeholder="Enter your blog title"
          className="title-input"
        />
      </Field>

      <Field error={errors.tags}>
        <input
          {...register('tags')}
          type="text"
          placeholder="Comma-separated tags, e.g. JavaScript, React, Node"
          className="tags-input"
        />
      </Field>

      <Field error={errors.content}>
        <textarea
          {...register('content')}
          rows={8}
          placeholder="Write your blog content"
        />
      </Field>

      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
