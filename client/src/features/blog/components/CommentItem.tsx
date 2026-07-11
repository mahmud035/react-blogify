import { Link } from 'react-router-dom';
import type { Blog, Comment } from '@/types/entities';
import { AVATAR_FALLBACK, getAvatarUrl } from '@/utils/media';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useDeleteComment } from '../hooks/useComments';

interface CommentItemProps {
  comment: Comment;
  blog: Blog;
}

export default function CommentItem({ comment, blog }: CommentItemProps) {
  const { user } = useAuth();
  const { mutate: deleteComment, isPending } = useDeleteComment(blog.id);
  const { author } = comment;

  // The server permits deletion by the comment author or the blog author.
  const canDelete =
    Boolean(user) &&
    (user?.id === author.id || user?.id === blog.author.id);

  return (
    <div className="flex flex-col my-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:items-center sm:flex-row">
      <div className="flex items-start w-full space-x-4 sm:mr-8">
        <Link
          to={`/profile/${author.id}`}
          className="transition-opacity hover:opacity-80"
          aria-label={`View ${author.firstName} ${author.lastName}'s profile`}
        >
          <img
            className="object-cover font-bold text-white avatar-img"
            src={getAvatarUrl(author.avatar, author.firstName)}
            onError={(e) => (e.currentTarget.src = AVATAR_FALLBACK)}
            alt=""
          />
        </Link>
        <div className="w-full">
          <Link
            to={`/profile/${author.id}`}
            className="font-bold transition-colors text-slate-400 hover:text-slate-300"
          >
            {author.firstName} {author.lastName}
          </Link>
          <p className="text-slate-300 whitespace-pre-line">{comment.content}</p>
        </div>
      </div>

      {canDelete && (
        <div className="flex items-center pl-12 transition-all sm:pl-0 hover:scale-110">
          <button
            type="button"
            onClick={() => deleteComment(comment.id)}
            disabled={isPending}
            className="px-2.5 py-0.5 text-white rounded-md bg-danger hover:bg-danger/80 sm:px-3 sm:py-1 disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
