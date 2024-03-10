import commentIcon from '../../assets/icons/comment.svg';
import heartFilledIcon from '../../assets/icons/heart-filled.svg';
import heartIcon from '../../assets/icons/heart.svg';
import likeIcon from '../../assets/icons/like.svg';
import likedFilledIcon from '../../assets/icons/likeFilled.svg';
import useGetUser from '../../hooks/auth/useGetUser';
import useBlog from '../../hooks/blog/useBlog';
import useBlogActions from '../../hooks/blog/useBlogActions';

const BlogActions = () => {
  const { handleToggleFavorite, handleToggleLike } = useBlogActions();
  const user = useGetUser();
  const { blogState } = useBlog();
  const { singleBlog } = blogState || {};
  const { id, likes, comments, author: { id: authorId } = {} } = singleBlog;

  // Check if the id is included in user's favorites
  const isFavorite = user?.favourites?.some((favorite) => favorite.id === id);
  const isLiked = likes?.some((like) => like?.id === user?.id);
  const showFavoriteIcon = authorId !== user?.id;

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
