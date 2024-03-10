import useGetUser from '../../../hooks/auth/useGetUser';
import useCommentActions from '../../../hooks/blog/comment/useCommentActions';

const Comment = ({ comment }) => {
  const user = useGetUser();
  const { handleDeleteComment } = useCommentActions();
  const {
    id,
    content,
    author: { id: authorId, firstName, lastName, avatar } = {},
  } = comment || {};

  // Show dummy avatar if avatar is not found
  const nameFirstChar = firstName?.slice(0, 1)?.toUpperCase();
  const authorAvatar =
    avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${avatar}`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;

  return (
    <div className="flex flex-col my-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:items-center sm:flex-row">
      <div className="flex items-start w-full space-x-4 sm:mr-8">
        <img
          className="font-bold text-white avater-img hover:text-white/80"
          src={authorAvatar}
          alt="Profile Image"
        />
        <div className="w-full">
          <div>
            <h5 className="font-bold text-slate -500">
              {firstName} {lastName}
            </h5>
            <p className="text-slate-300">{content}</p>
          </div>
        </div>
      </div>
      {user && user?.id === authorId && (
        <div className="flex items-center pl-12 sm:pl-0">
          <button
            onClick={() => handleDeleteComment(id)}
            className="px-2.5 py-0.5 text-white bg-red-500 rounded-md sm:px-3 sm:py-1"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
