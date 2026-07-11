import type { Blog } from '@/types/entities';
import { useAuth } from '@/features/auth/context/AuthContext';
import CommentBox from './CommentBox';
import CommentItem from './CommentItem';

interface BlogCommentsProps {
  blog: Blog;
}

export default function BlogComments({ blog }: BlogCommentsProps) {
  const { user } = useAuth();
  const { comments } = blog;

  return (
    <section id="comments">
      <div className="w-full pb-8 mx-auto container md:w-10/12">
        <h2 className="my-8 text-3xl font-bold">Comments ({comments.length})</h2>

        {user && <CommentBox blogId={blog.id} />}

        {comments.length === 0 ? (
          <p className="py-6 italic text-muted">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} blog={blog} />
          ))
        )}
      </div>
    </section>
  );
}
