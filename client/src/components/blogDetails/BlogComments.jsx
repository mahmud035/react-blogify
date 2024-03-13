import { useRef } from 'react';
import useGetUser from '../../hooks/auth/useGetUser';
import useBlog from '../../hooks/blog/useBlog';
import CommentBox from './comments/CommentBox';
import CommentList from './comments/CommentList';

const BlogComments = () => {
  const { blogState: { singleBlog } = {} } = useBlog();
  const { comments } = singleBlog;
  const user = useGetUser();
  const commentListRef = useRef(null);

  return (
    <section id="comments">
      <div className="container w-full pb-8 mx-auto md:w-10/12">
        <h2 className="my-8 text-3xl font-bold">
          Comments ({comments?.length})
        </h2>

        {/* NOTE: If user is loggedIn, then show the commentBox. */}
        {user && <CommentBox ref={commentListRef} />}
        <CommentList ref={commentListRef} />
      </div>
    </section>
  );
};

export default BlogComments;
