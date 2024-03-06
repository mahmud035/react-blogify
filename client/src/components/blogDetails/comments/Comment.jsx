const Comment = ({ comment }) => {
  const { content, author: { firstName, lastName, avatar } = {} } =
    comment || {};

  // Show dummy avatar if avatar is not found
  const nameFirstChar = firstName?.slice(0, 1)?.toUpperCase();
  const authorAvatar =
    avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${avatar}`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;

  return (
    <div className="flex items-start my-8 space-x-4">
      <img
        className="font-bold text-white avater-img hover:text-white/80"
        src={authorAvatar}
        alt="Profile Image"
      />
      <div className="w-full">
        <h5 className="font-bold text-slate -500">
          {firstName} {lastName}
        </h5>
        <p className="text-slate-300">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
