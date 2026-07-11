import { Link } from 'react-router-dom';
import type { Blog } from '@/types/entities';
import {
  AVATAR_FALLBACK,
  getAvatarUrl,
  getThumbnailUrl,
  THUMBNAIL_FALLBACK,
} from '@/utils/media';
import { getFormattedDate } from '@/utils/format';
import Tags from './Tags';

interface BlogDetailsCardProps {
  blog: Blog;
}

export default function BlogDetailsCard({ blog }: BlogDetailsCardProps) {
  const { title, content, thumbnail, author, tags, likes, createdAt } = blog;

  return (
    <section>
      <div className="container py-8 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>

        <div className="flex flex-wrap items-center justify-center gap-4 my-4">
          <div className="flex items-center space-x-2 capitalize">
            <Link
              to={`/profile/${author.id}`}
              className="transition-opacity hover:opacity-80"
              aria-label={`View ${author.firstName} ${author.lastName}'s profile`}
            >
              <img
                className="object-cover font-bold text-white avatar-img"
                src={getAvatarUrl(author.avatar, author.firstName)}
                onError={(e) => (e.currentTarget.src = AVATAR_FALLBACK)}
                alt=""
              />
            </Link>
            <Link
              to={`/profile/${author.id}`}
              className="text-sm transition-colors text-slate-500 hover:text-slate-400"
            >
              {author.firstName} {author.lastName}
            </Link>
          </div>

          <span className="text-sm text-slate-700 dot">
            {getFormattedDate(createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {likes.length} Likes
          </span>
        </div>

        <img
          className="object-cover w-full mx-auto rounded-md md:w-8/12 h-80 md:h-96"
          src={getThumbnailUrl(thumbnail)}
          onError={(e) => (e.currentTarget.src = THUMBNAIL_FALLBACK)}
          alt="Blog thumbnail"
        />

        <Tags tags={tags} />

        <div className="w-full py-2 mx-auto text-base leading-8 text-left md:w-10/12 text-slate-300 md:text-lg whitespace-pre-line">
          {content}
        </div>
      </div>
    </section>
  );
}
