import { Link } from 'react-router-dom';
import useBlog from '../../hooks/useBlog';
import Tags from './Tags';

const BlogDetailsCard = () => {
  const { blogState } = useBlog();
  const { singleBlog } = blogState || {};
  const {
    title,
    content,
    thumbnail,
    author: { id: authorId, firstName, lastName, avatar } = {},
    tags,
    likes,
    createdAt,
  } = singleBlog;

  // Show dummy avatar if avatar is not found
  const nameFirstChar = firstName?.slice(0, 1)?.toUpperCase();
  const authorAvatar =
    avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${avatar}`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;

  const blogThumbnail = `${
    import.meta.env.VITE_SERVER_BASE_URL
  }/uploads/blog/${thumbnail}`;

  return (
    <section>
      <div className="container py-8 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        <div className="flex items-center justify-center gap-4 my-4">
          <Link to={`/profile/${authorId}`}>
            <div className="flex items-center space-x-2 capitalize">
              <img
                className="font-bold text-white avater-img hover:text-white/80"
                src={authorAvatar}
                alt="Profile Image"
              />
              <h5 className="text-sm text-slate-500">
                {firstName} {lastName}
              </h5>
            </div>
          </Link>
          <span className="text-sm text-slate-700 dot">June 28, 2018</span>
          <span className="text-sm text-slate-700 dot">
            {likes?.length} Likes
          </span>
        </div>
        <img
          className="object-cover w-full mx-auto md:w-8/12 h-80 md:h-96"
          src={blogThumbnail ? blogThumbnail : `https://dummyimage.com/400x400`}
          alt=""
        />
        {/* Tags */}
        <Tags tags={tags} />

        {/* Content */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {content?.slice(0, 550)}
          <br />
          {content?.length > 550 && content?.slice(551, 1200)}
          <br />
          {content?.length > 1200 && content?.slice(1200)}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsCard;
