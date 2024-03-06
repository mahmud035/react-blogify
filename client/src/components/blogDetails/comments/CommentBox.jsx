import useGetUser from '../../../hooks/useGetUser';

const CommentBox = () => {
  const user = useGetUser();

  // Show dummy avatar if user's avatar is not found
  const userNameFirstChar = user?.firstName?.slice(0, 1)?.toUpperCase();
  const userAvatar =
    user?.avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${user?.avatar}`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${userNameFirstChar}`;

  return (
    <div className="flex space-x-4 items -center">
      <img
        className="font-bold text-white avater-img hover:text-white/80"
        src={userAvatar}
        alt="Profile Image"
      />
      <div className="w-full">
        <textarea
          className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
          placeholder="Write a comment"
        ></textarea>
        <div className="flex justify-end mt-4">
          <button className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
