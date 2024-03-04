import CommentBox from './comments/CommentBox';
import CommentList from './comments/CommentList';

const BlogComments = ({ comments }) => {
  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">Comments (3)</h2>

        {/* TODO: If user is loggedIn, then show the commentBox. */}
        <CommentBox />
        <CommentList comments={comments} />
      </div>
    </section>
  );
};

export default BlogComments;
