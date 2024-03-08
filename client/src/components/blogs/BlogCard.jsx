import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { actions } from '../../actions';
import threeDotsIcon from '../../assets/icons/3dots.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import useAxios from '../../hooks/useAxios';
import useBlog from '../../hooks/useBlog';
import useFetchBlogAuthorData from '../../hooks/useFetchBlogAuthorData';
import useGetUser from '../../hooks/useGetUser';
import useProfile from '../../hooks/useProfile';
import useSearch from '../../hooks/useSearch';

const BlogCard = ({ blog }) => {
  const [showAction, setShowAction] = useState(false);
  const { searchText, setSearchText, setShowSearchModal } = useSearch();
  const navigate = useNavigate();
  const user = useGetUser();
  const { fetchBlogAuthorData } = useFetchBlogAuthorData();
  const { profileDispatch } = useProfile();
  const { blogDispatch } = useBlog();
  const { api } = useAxios();
  const {
    id,
    title,
    content,
    thumbnail,
    author: { id: profileId, firstName, lastName, avatar } = {},
    likes,
  } = blog || {};

  const isBlogPostedByUser = blog?.author?.id === user?.id;

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
    navigate(`/blogs/${id}`);
    setSearchText('');
  };

  //* Navigate to Edit Blog Page
  const handleEditBlog = (e, blog, blogId) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem('blogToEdit', JSON.stringify(blog));
    navigate(`/edit-blog/${blogId}`);
    setShowAction(false);
  };

  //* Delete Blog
  const handleDeleteBlog = async (e, blogId) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm('Are you sure you want to DELETE the blog?');

    if (confirm) {
      // delete blog task
      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );

        if (response.status === 200) {
          profileDispatch({
            type: actions.profile.DATA_DELETED,
            data: blog?.id,
          });
          blogDispatch({ type: actions.blog.DATA_DELETED, data: blog?.id });
          toast.success('Blog deleted successfully');
          setShowAction(false);
        }
      } catch (error) {
        profileDispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    }
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
                  fetchBlogAuthorData(profileId);
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
                    fetchBlogAuthorData(profileId);
                  }}
                  className="text-sm text-slate-500"
                >
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
              {/* TODO: Use e.preventDefault() and e.stopPropagation() to stop the propagation of click event */}
              <button
                onClick={(e) => handleEditBlog(e, blog, id)}
                className="action-menu-item hover:text-lwsGreen"
              >
                <img src={editIcon} alt="Edit" />
                Edit
              </button>
              <button
                onClick={(e) => handleDeleteBlog(e, id)}
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
