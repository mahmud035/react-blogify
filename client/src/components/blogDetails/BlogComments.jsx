import useGetUser from '../../hooks/auth/useGetUser';
import useBlog from '../../hooks/blog/useBlog';
import CommentBox from './comments/CommentBox';
import CommentList from './comments/CommentList';

const BlogComments = () => {
  const { blogState: { singleBlog } = {} } = useBlog();
  const { comments } = singleBlog;
  const user = useGetUser();

  return (
    <section id="comments">
      <div className="container w-full pb-5 mx-auto md:w-10/12">
        <h2 className="my-8 text-3xl font-bold">
          Comments ({comments?.length})
        </h2>

        {/* TODO: If user is loggedIn, then show the commentBox. */}
        {user && <CommentBox />}
        <CommentList />
      </div>
    </section>
  );
};

export default BlogComments;
