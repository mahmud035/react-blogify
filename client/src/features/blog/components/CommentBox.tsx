import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Field from '@/components/ui/Field';
import { cn } from '@/lib/cn';
import { AVATAR_FALLBACK, getAvatarUrl } from '@/utils/media';
import { useAuth } from '@/features/auth/context/AuthContext';
import { commentSchema, type CommentFormValues } from '../blog.schema';
import { useAddComment } from '../hooks/useComments';

interface CommentBoxProps {
  blogId: string;
}

export default function CommentBox({ blogId }: CommentBoxProps) {
  const { user } = useAuth();
  const { mutate: addComment, isPending } = useAddComment(blogId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' },
  });

  const onSubmit = handleSubmit(({ content }) =>
    addComment(content, { onSuccess: () => reset() }),
  );

  return (
    <div className="flex space-x-4">
      <img
        className="object-cover font-bold text-white avatar-img"
        src={getAvatarUrl(user?.avatar, user?.firstName)}
        onError={(e) => (e.currentTarget.src = AVATAR_FALLBACK)}
        alt=""
      />

      <form onSubmit={onSubmit} className="w-full">
        <Field error={errors.content}>
          <textarea
            {...register('content')}
            rows={3}
            placeholder="Write a comment"
            aria-label="Write a comment"
            className={cn(
              'w-full p-4 rounded-md bg-background border text-slate-300 focus:outline-none transition-colors',
              errors.content
                ? 'border-danger focus:border-danger'
                : 'border-slate-500 focus:border-primary',
            )}
          />
        </Field>
        <div className="flex justify-end mt-2">
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? 'Posting…' : 'Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}
