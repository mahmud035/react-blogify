import useBlog from '../../hooks/blog/useBlog';
import useFetchBlogAuthorData from '../../hooks/profile/useFetchBlogAuthorData';
import { getFormattedDate } from '../../utils/date-time-utils';
import Tags from './Tags';

const BlogDetailsCard = () => {
  const { fetchBlogAuthorData } = useFetchBlogAuthorData();
  const { blogState } = useBlog();
  const { singleBlog } = blogState || {};
  const {
    title,
    content,
    thumbnail,
    author: { id: profileId, firstName, lastName, avatar } = {},
    tags,
    likes,
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
          <div className="flex items-center space-x-2 capitalize">
            <img
              onClick={() => {
                fetchBlogAuthorData(profileId);
              }}
              className="font-bold text-white cursor-pointer avater-img hover:text-white/80"
              src={authorAvatar}
              alt="Profile Image"
            />
            <h5
              onClick={() => {
                fetchBlogAuthorData(profileId);
              }}
              className="text-sm cursor-pointer text-slate-500"
            >
              {firstName} {lastName}
            </h5>
          </div>

          <span className="text-sm text-slate-700 dot">
            {singleBlog?.createdAt && getFormattedDate(singleBlog?.createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {likes?.length} Likes
          </span>
        </div>
        <img
          className="object-cover w-full mx-auto rounded-md md:w-8/12 h-80 md:h-96"
          src={blogThumbnail ? blogThumbnail : `https://dummyimage.com/600x400`}
          onError={(e) => {
            e.currentTarget.src =
              'https://placehold.co/600x400?text=Your%20image%20is%20uploaded.%20Please%20refresh%20the%20page.';
          }}
          alt="Blog Thumbnail"
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
