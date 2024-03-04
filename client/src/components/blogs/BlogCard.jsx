import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogImage from '../../assets/blogs/React-Roadmap.jpg';
import threeDotsIcon from '../../assets/icons/3dots.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import useSearch from '../../hooks/useSearch';

const BlogCard = () => {
  const [showAction, setShowAction] = useState(false);
  const { searchText, setSearchText, setShowSearchModal } = useSearch();
  const navigate = useNavigate();

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
    navigate(`/blogs/:1`);
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
        src={blogImage}
        alt=""
      />
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">
          React Roadmap in 2024
        </h3>
        <p className="mb-6 text-base text-slate-500 mt-1">
          Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor
          pretium donec dictum. Vici consequat justo enim. Venenatis eget
          adipiscing luctus lorem.
        </p>

        {/* If searchText is empty, then show userInfo  */}
        {!searchText && (
          <div className="flex justify-between items-center">
            <div className="flex items-center capitalize space-x-2">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/profile');
                }}
                className="avater-img bg-indigo-600 text-white"
              >
                <span className="">S</span>
              </div>
              <div>
                <h5
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('/profile');
                  }}
                  className="text-slate-500 text-sm"
                >
                  {/* <Link to="/profile">Saad Hasan</Link> */}
                  Saad Hasan
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>June 28, 2018</span>
                </div>
              </div>
            </div>

            <div className="text-sm px-2 py-1 text-slate-700">
              <span>100 Likes</span>
            </div>
          </div>
        )}

        {/* TODO: Use e.preventDefault() and e.stopPropagation() to stop the propagation of click event */}

        {/* TODO: Show 3dots Icons only if the blog is posted by the loggedIn user */}
        {/* action dot  */}
        <div className="absolute right-0 top-0">
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
