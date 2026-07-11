import { Link, useNavigate } from 'react-router-dom';
import type { Blog } from '@/types/entities';
import {
  AVATAR_FALLBACK,
  getAvatarUrl,
  getThumbnailUrl,
  THUMBNAIL_FALLBACK,
} from '@/utils/media';
import { getFormattedDate } from '@/utils/format';

interface BlogCardProps {
  blog: Blog;
  /** Highlights matching substrings of the title (used by search). */
  keyword?: string;
}

function highlight(title: string, keyword: string) {
  if (!keyword) return title;
  return title.split(new RegExp(`(${keyword})`, 'i')).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={i} className="text-accent">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function BlogCard({ blog, keyword = '' }: BlogCardProps) {
  const navigate = useNavigate();
  const { id, title, content, thumbnail, author, likes, createdAt } = blog;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Read blog: ${title}`}
      onClick={() => navigate(`/blogs/${id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/blogs/${id}`);
      }}
      className="blog-card"
    >
      <img
        className={`blog-thumb ${keyword ? 'h-28' : 'max-h-48'}`}
        src={getThumbnailUrl(thumbnail)}
        onError={(e) => (e.currentTarget.src = THUMBNAIL_FALLBACK)}
        alt=""
      />

      <div className="relative mt-2">
        <h3 className="text-xl text-slate-300 lg:text-2xl">
          {highlight(title, keyword)}
        </h3>
        <p className="mt-1 mb-6 text-base text-slate-500">
          {content.length > 176 ? `${content.slice(0, 177)}...` : content}
        </p>

        {!keyword && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 capitalize">
              <Link
                to={`/profile/${author.id}`}
                onClick={(e) => e.stopPropagation()}
                className="transition-opacity hover:opacity-80"
                aria-label={`View ${author.firstName} ${author.lastName}'s profile`}
              >
                <img
                  className="pointer-events-none avatar-img"
                  src={getAvatarUrl(author.avatar, author.firstName)}
                  onError={(e) => (e.currentTarget.src = AVATAR_FALLBACK)}
                  alt=""
                />
              </Link>
              <div>
                <Link
                  to={`/profile/${author.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm transition-colors text-slate-500 hover:text-slate-400"
                >
                  {author.firstName} {author.lastName}
                </Link>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{getFormattedDate(createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="px-2 py-1 text-sm text-slate-700">
              <span>{likes.length} Likes</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
