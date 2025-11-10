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
        {/* Like Button */}
        <li>
          <button
            onClick={() => handleToggleLike(id)}
            className="flex items-center gap-2 p-0 transition-opacity bg-transparent border-none cursor-pointer hover:opacity-80"
            aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
            type="button"
          >
            <img
              src={isLiked ? likedFilledIcon : likeIcon}
              alt=""
              className="pointer-events-none"
            />
            <span>{likes?.length}</span>
          </button>
        </li>

        {/* Favorite Button */}
        {showFavoriteIcon && (
          <li>
            <button
              onClick={() => handleToggleFavorite(id)}
              className="p-0 transition-opacity bg-transparent border-none cursor-pointer hover:opacity-80"
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              type="button"
            >
              <img
                src={isFavorite ? heartFilledIcon : heartIcon}
                alt=""
                className="pointer-events-none"
              />
            </button>
          </li>
        )}

        {/* Comments Link */}
        <li>
          <a
            href="#comments"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label={`View ${comments?.length} comments`}
          >
            <img src={commentIcon} alt="" className="pointer-events-none" />
            <span>{comments?.length}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BlogActions;
