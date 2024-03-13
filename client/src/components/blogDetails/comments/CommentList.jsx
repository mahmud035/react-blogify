import { forwardRef } from 'react';
import useBlog from '../../../hooks/blog/useBlog';
import Comment from './Comment';

const CommentList = forwardRef((props, ref) => {
  const { blogState } = useBlog();
  const { singleBlog } = blogState || {};
  const { comments } = singleBlog;

  return (
    <>
      {comments?.length > 0 ? (
        <div ref={ref}>
          {comments?.map((comment) => (
            <Comment key={comment?.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-2xl italic text-center">No Comment Found!</p>
      )}
    </>
  );
});

export default CommentList;
