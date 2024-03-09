import { toast } from 'react-toastify';
import { actions } from '../../actions';
import commentIcon from '../../assets/icons/comment.svg';
import heartFilledIcon from '../../assets/icons/heart-filled.svg';
import heartIcon from '../../assets/icons/heart.svg';
import likeIcon from '../../assets/icons/like.svg';
import likedFilledIcon from '../../assets/icons/likeFilled.svg';
import useAxios from '../../hooks/auth/useAxios';
import useGetUser from '../../hooks/auth/useGetUser';
import useBlog from '../../hooks/blog/useBlog';
import useProfile from '../../hooks/profile/useProfile';

const BlogActions = () => {
  const { profileDispatch } = useProfile();
  const { api } = useAxios();
  const user = useGetUser();
  const { blogState, blogDispatch } = useBlog();
  const { singleBlog } = blogState || {};
  const { id, likes, comments, author: { id: authorId } = {} } = singleBlog;

  // Check if the id is included in user's favorites
  const isFavorite = user?.favourites?.some((favorite) => favorite.id === id);
  const isLiked = likes?.some((like) => like?.id === user?.id);
  const showFavoriteIcon = authorId !== user?.id;

  //* Toggle Favorite
  const handleToggleFavorite = async (blogId) => {
    if (!user) return toast.error(`Please login to add the blog to favorites.`);

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

  //* Toggle Like
  const handleToggleLike = async (blogId) => {
    if (!user) return toast.error(`Please login to like the blog.`);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`
      );

      if (response.status === 200) {
        blogDispatch({
          type: actions.blog.TOGGLE_LIKE,
          data: response.data.likes,
        });
      }
    } catch (error) {
      blogDispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img
            onClick={() => handleToggleLike(id)}
            src={isLiked ? likedFilledIcon : likeIcon}
            alt="like"
          />
          <span>{likes?.length}</span>
        </li>

        {showFavoriteIcon && (
          <li onClick={() => handleToggleFavorite(id)}>
            <img
              src={isFavorite ? heartFilledIcon : heartIcon}
              alt="Favorite"
            />
          </li>
        )}

        <a href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>{comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default BlogActions;
