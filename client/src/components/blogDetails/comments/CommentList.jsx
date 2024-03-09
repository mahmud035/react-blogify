import useBlog from '../../../hooks/blog/useBlog';
import Comment from './Comment';

const CommentList = () => {
  const { blogState } = useBlog();
  const { singleBlog } = blogState || {};
  const { comments } = singleBlog;

  return (
    <>
      {comments?.length > 0 ? (
        comments?.map((comment) => (
          <Comment key={comment?.id} comment={comment} />
        ))
      ) : (
        <p className="pt-4 text-2xl text-center">No Comments Found!</p>
      )}
    </>
  );
};

export default CommentList;
