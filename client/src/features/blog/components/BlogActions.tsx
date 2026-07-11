import { toast } from 'react-toastify';
import commentIcon from '@/assets/icons/comment.svg';
import heartIcon from '@/assets/icons/heart.svg';
import heartFilledIcon from '@/assets/icons/heart-filled.svg';
import likeIcon from '@/assets/icons/like.svg';
import likedFilledIcon from '@/assets/icons/likeFilled.svg';
import type { Blog } from '@/types/entities';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useToggleLike } from '../hooks/useToggleLike';
import { useToggleFavourite } from '../hooks/useToggleFavourite';

interface BlogActionsProps {
  blog: Blog;
}

export default function BlogActions({ blog }: BlogActionsProps) {
  const { user } = useAuth();
  const { mutate: toggleLike, isPending: liking } = useToggleLike(blog.id);
  const { mutate: toggleFavourite, isPending: favouriting } =
    useToggleFavourite(blog.id);

  const requireAuth = () => {
    toast.info('Please log in to continue');
    return false;
  };

  const handleLike = () => {
    if (!user) return requireAuth();
    toggleLike();
  };

  const handleFavourite = () => {
    if (!user) return requireAuth();
    toggleFavourite();
  };

  const isLiked = Boolean(blog.isLiked);
  const isFavourite = Boolean(blog.isFavourite);
  const showFavourite = user && blog.author.id !== user.id;

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <button
            type="button"
            onClick={handleLike}
            disabled={liking}
            className="flex items-center gap-2 p-0 transition-opacity bg-transparent border-none cursor-pointer hover:opacity-80 disabled:opacity-60"
            aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
          >
            <img
              src={isLiked ? likedFilledIcon : likeIcon}
              alt=""
              className="pointer-events-none"
            />
            <span>{blog.likes.length}</span>
          </button>
        </li>

        {showFavourite && (
          <li>
            <button
              type="button"
              onClick={handleFavourite}
              disabled={favouriting}
              className="p-0 transition-opacity bg-transparent border-none cursor-pointer hover:opacity-80 disabled:opacity-60"
              aria-label={
                isFavourite ? 'Remove from favourites' : 'Add to favourites'
              }
            >
              <img
                src={isFavourite ? heartFilledIcon : heartIcon}
                alt=""
                className="pointer-events-none"
              />
            </button>
          </li>
        )}

        <li>
          <a
            href="#comments"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label={`View ${blog.comments.length} comments`}
          >
            <img src={commentIcon} alt="" className="pointer-events-none" />
            <span>{blog.comments.length}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
