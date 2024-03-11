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

  //* Navigate to Edit Blog Page
  const navigateEditBlogPage = (e, blog, blogId) => {
    stopDefaultBehavior(e);
    localStorage.setItem('blogToEdit', JSON.stringify(blog));
    navigate(`/edit-blog/${blogId}`);
    setShowAction(false);
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
          {title ? title : 'No Title Found'}
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
              <div
                onClick={(e) => {
                  stopDefaultBehavior(e);
                  fetchBlogAuthorProfile(profileId, true);
                }}
                className="text-white"
              >
                <img
                  className="avater-img hover:text-white/80"
                  src={authorAvatar}
                  alt="Profile Image"
                />
              </div>
              <div>
                <h5
                  onClick={(e) => {
                    stopDefaultBehavior(e);
                    fetchBlogAuthorProfile(profileId, true);
                  }}
                  className="text-sm text-slate-500"
                >
                  {firstName} {lastName}
                </h5>
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
              onClick={(e) => {
                handleShowAction(e);
              }}
            >
              <img src={threeDotsIcon} alt="3dots of Action" />
            </button>
          )}

          {/* Action Menus Popup  */}
          {showAction && (
            <div className="action-modal-container">
              {/* NOTE: Use e.preventDefault() and e.stopPropagation() to stop the propagation of click event */}
              <button
                onClick={(e) => navigateEditBlogPage(e, blog, id)}
                className="action-menu-item hover:text-lwsGreen"
              >
                <img src={editIcon} alt="Edit" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  stopDefaultBehavior(e);
                  handleDeleteBlog(id);
                }}
                className="action-menu-item hover:text-red-500"
              >
                <img src={deleteIcon} alt="Delete" />
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
