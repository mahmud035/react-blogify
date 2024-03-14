import useGetUser from '../../../hooks/auth/useGetUser';
import useCommentActions from '../../../hooks/blog/comment/useCommentActions';
import useFetchBlogAuthorProfile from '../../../hooks/profile/useFetchBlogAuthorData';
import { getAuthorAvatar } from '../../../utils';

const Comment = ({ comment }) => {
  const user = useGetUser();
  const { handleDeleteComment } = useCommentActions();
  const { fetchBlogAuthorProfile } = useFetchBlogAuthorProfile();
  const {
    id,
    content,
    author: { id: authorId, firstName, lastName, avatar } = {},
  } = comment || {};

  // Show dummy avatar if avatar is not found
  const nameFirstChar = firstName?.slice(0, 1)?.toUpperCase();
  const authorAvatar = getAuthorAvatar(avatar, nameFirstChar);

  return (
    <div className="flex flex-col my-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:items-center sm:flex-row">
      <div className="flex items-start w-full space-x-4 sm:mr-8">
        <img
          onClick={() => {
            fetchBlogAuthorProfile(authorId, true);
          }}
          className="font-bold text-white cursor-pointer avater-img hover:text-white/80"
          src={authorAvatar}
          onError={(e) => {
            e.currentTarget.src =
              'https://placehold.co/200?text=Image%20updated.%20Reload%20Page';
          }}
          alt="Profile Image"
        />
        <div className="w-full">
          <div>
            <h5
              onClick={() => {
                fetchBlogAuthorProfile(authorId, true);
              }}
              className="font-bold cursor-pointer text-slate-400"
            >
              {firstName} {lastName}
            </h5>
            <p className="text-slate-300">{content}</p>
          </div>
        </div>
      </div>
      {user && user?.id === authorId && (
        <div className="flex items-center pl-12 transition-all sm:pl-0 hover:scale-110">
          <button
            onClick={() => handleDeleteComment(id)}
            className="px-2.5 py-0.5 text-white bg-red-500 hover:bg-red-500/80 rounded-md sm:px-3 sm:py-1"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
