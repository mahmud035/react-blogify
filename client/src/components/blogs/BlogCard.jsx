import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import threeDotsIcon from '../../assets/icons/3dots.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import useSearch from '../../hooks/useSearch';

const BlogCard = ({ blog }) => {
  const [showAction, setShowAction] = useState(false);
  const { searchText, setSearchText, setShowSearchModal } = useSearch();
  const navigate = useNavigate();
  const {
    id,
    title,
    content,
    thumbnail,
    author: { firstName, lastName, avatar } = {},
    likes,
  } = blog || {};

  // Show dummy avatar if avatar is not found
  const nameFirstChar = firstName?.slice(0, 1)?.toUpperCase();
  const authorAvatar =
    avatar !== null
      ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${avatar}`
      : `https://dummyimage.com/200x200/00D991/ffffff&text=${nameFirstChar}`;

  const blogThumbnail = `${
    import.meta.env.VITE_SERVER_BASE_URL
  }/uploads/blog/${thumbnail}`;

  const handleShowAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAction((prevAction) => !prevAction);
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSearchModal(false);
    //  TODO: Change with this: /blogs/:blogId
    navigate(`/blogs/${id}`);
    setSearchText('');
  };

  const handleEditBlog = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // edit blog task
  };

  const handleDeleteBlog = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // delete blog task
  };

  return (
    <div onClick={(e) => handleNavigate(e)} className="blog-card">
      <img
        className={`blog-thumb ${searchText.length > 0 ? 'h-28' : 'max-h-48'}`}
        src={blogThumbnail ? blogThumbnail : `https://dummyimage.com/400x400`}
        alt=""
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
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/profile');
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
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('/profile');
                  }}
                  className="text-sm text-slate-500"
                >
                  {/* <Link to="/profile">Saad Hasan</Link> */}
                  {firstName} {lastName}
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>June 28, 2018</span>
                </div>
              </div>
            </div>

            <div className="px-2 py-1 text-sm text-slate-700">
              <span>{likes?.length} Likes</span>
            </div>
          </div>
        )}

        {/* TODO: Use e.preventDefault() and e.stopPropagation() to stop the propagation of click event */}

        {/* TODO: Show 3dots Icons only if the blog is posted by the loggedIn user */}
        {/* action dot  */}
        <div className="absolute top-0 right-0">
          <button
            onClick={(e) => {
              handleShowAction(e);
            }}
          >
            <img src={threeDotsIcon} alt="3dots of Action" />
          </button>

          {/* Action Menus Popup  */}
          {showAction && (
            <div className="action-modal-container">
              {/* TODO: Use e.preventDefault() and e.stopPropagation() to stop the propagation of click event */}
              <button
                onClick={(e) => handleEditBlog(e)}
                className="action-menu-item hover:text-lwsGreen"
              >
                <img src={editIcon} alt="Edit" />
                Edit
              </button>
              <button
                onClick={(e) => handleDeleteBlog(e)}
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
