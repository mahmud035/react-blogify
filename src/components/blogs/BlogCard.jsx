import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import threeDotsIcon from '../../assets/icons/3dots.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import useGetUser from '../../hooks/auth/useGetUser';
import useBlogActions from '../../hooks/blog/useBlogActions';
import useFetchBlogAuthorProfile from '../../hooks/profile/useFetchBlogAuthorData';
import useSearch from '../../hooks/search/useSearch';
import {
  getAuthorAvatar,
  getBlogThumbnail,
  stopDefaultBehavior,
} from '../../utils';
import { getFormattedDate } from '../../utils/date-time-utils';

const BlogCard = ({ blog }) => {
  const [showAction, setShowAction] = useState(false);
  const { searchText, setSearchText, setShowSearchModal, setSearchResult } =
    useSearch();
  const navigate = useNavigate();
  const user = useGetUser();
  const { fetchBlogAuthorProfile } = useFetchBlogAuthorProfile();
  const { handleDeleteBlog } = useBlogActions();
  const {
    id,
    title,
    content,
    thumbnail,
    author: { id: profileId, firstName, lastName, avatar } = {},
    likes,
  } = blog || {};
  const blogThumbnail = getBlogThumbnail(thumbnail);

  const isBlogPostedByUser = blog?.author?.id === user?.id;

  // Show dummy avatar if avatar is not found
  const nameFirstChar = firstName?.slice(0, 1)?.toUpperCase();
  const authorAvatar = getAuthorAvatar(avatar, nameFirstChar);

  const handleShowAction = (e) => {
    stopDefaultBehavior(e);
    setShowAction((prevAction) => !prevAction);
  };

  const handleNavigate = (e) => {
    stopDefaultBehavior(e);
    setShowSearchModal(false);
    navigate(`/blogs/${id}`);
    setSearchText('');
    setSearchResult([]);
  };

  const handleViewProfile = (e) => {
    stopDefaultBehavior(e);
    fetchBlogAuthorProfile(profileId, true);
  };

  //* Navigate to Edit Blog Page
  const navigateEditBlogPage = (e, blog, blogId) => {
    stopDefaultBehavior(e);
    localStorage.setItem('blogToEdit', JSON.stringify(blog));
    navigate(`/edit-blog/${blogId}`);
    setShowAction(false);
    setShowSearchModal(false);
    setSearchText('');
    setSearchResult([]);
  };

  return (
    <div onClick={(e) => handleNavigate(e)} className="blog-card">
      <img
        className={`blog-thumb ${searchText.length > 0 ? 'h-28' : 'max-h-48'}`}
        src={blogThumbnail ? blogThumbnail : `https://dummyimage.com/600x400`}
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/600x400';
        }}
        alt="Blog Thumbnail"
      />
      <div className="relative mt-2">
        <h3 className="text-xl text-slate-300 lg:text-2xl">
          {searchText
            ? title.split(new RegExp(`(${searchText})`, 'i')).map((char, i) =>
                char.toLowerCase() === searchText.toLowerCase() ? (
                  <span key={i} className="text-[#00d991]">
                    {char}
                  </span>
                ) : (
                  <span key={i}>{char}</span>
                )
              )
            : title}
        </h3>
        <p className="mt-1 mb-6 text-base text-slate-500">
          {content && content?.length > 176
            ? `${content.slice(0, 177)}...`
            : content}
        </p>

        {/* If searchText is empty, then show userInfo  */}
        {!searchText && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 capitalize">
              <button
                onClick={handleViewProfile}
                className="p-0 text-white transition-opacity bg-transparent border-none cursor-pointer hover:opacity-80"
                aria-label={`View ${firstName} ${lastName}'s profile`}
                type="button"
              >
                <img
                  className="pointer-events-none avater-img"
                  src={authorAvatar}
                  alt=""
                />
              </button>
              <div>
                <button
                  onClick={handleViewProfile}
                  className="p-0 text-sm text-left transition-colors bg-transparent border-none cursor-pointer text-slate-500 hover:text-slate-400"
                  type="button"
                >
                  {firstName} {lastName}
                </button>
                <div className="flex items-center text-xs text-slate-700">
                  <span>
                    {blog?.createdAt && getFormattedDate(blog?.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-2 py-1 text-sm text-slate-700">
              <span>{likes?.length} Likes</span>
            </div>
          </div>
        )}

        {/* Show 3dots Icons only if the blog is posted by the loggedIn user */}
        {/* action dot  */}
        <div className="absolute top-0 right-0">
          {isBlogPostedByUser && (
            <button
              onClick={handleShowAction}
              className="p-0 transition-opacity bg-transparent border-none cursor-pointer hover:opacity-80"
              aria-label="Blog actions menu"
              aria-expanded={showAction}
              type="button"
            >
              <img src={threeDotsIcon} alt="" className="pointer-events-none" />
            </button>
          )}

          {/* Action Menus Popup  */}
          {showAction && (
            <div className="action-modal-container">
              <button
                onClick={(e) => navigateEditBlogPage(e, blog, id)}
                className="action-menu-item hover:text-green-500"
              >
                <img src={editIcon} alt="" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  stopDefaultBehavior(e);
                  handleDeleteBlog(id);
                }}
                className="action-menu-item hover:text-red-500"
              >
                <img src={deleteIcon} alt="" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
