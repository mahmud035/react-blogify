import { toast } from 'react-toastify';
import { actions } from '../../actions';
import commentIcon from '../../assets/icons/comment.svg';
import heartFilledIcon from '../../assets/icons/heart-filled.svg';
import heartIcon from '../../assets/icons/heart.svg';
import likeIcon from '../../assets/icons/like.svg';
import useAxios from '../../hooks/useAxios';
import useBlog from '../../hooks/useBlog';
import useGetUser from '../../hooks/useGetUser';
import useProfile from '../../hooks/useProfile';

const BlogActions = () => {
  const { profile, profileDispatch } = useProfile();
  const { user: loggedInUser } = profile || {};
  const { api } = useAxios();
  const user = useGetUser();
  const { blogState } = useBlog();
  const { singleBlog } = blogState || {};
  const { id } = singleBlog;

  // Check if the id is included in user's favorites
  const isFavorite = loggedInUser?.favourites?.some(
    (favorite) => favorite.id === id
  );

  const handleToggleFavorite = async (blogId) => {
    if (!user) return toast.error(`Please login to add the blog to favorites.`);

    // profileDispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/favourite`
      );

      if (response.status === 200) {
        profileDispatch({
          type: actions.profile.TOGGLE_FAVORITE,
          data: response.data,
        });
      }
    } catch (error) {
      profileDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={likeIcon} alt="like" />
          <span>10</span>
        </li>

        <li onClick={() => handleToggleFavorite(id)}>
          {/* There is heart-filled.svg in the icons folder  */}

          <img src={isFavorite ? heartFilledIcon : heartIcon} alt="Favorite" />
        </li>
        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default BlogActions;
