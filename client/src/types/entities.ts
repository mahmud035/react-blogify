/** Denormalized author snapshot returned via populate. */
export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  author: Author;
  tags: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  /** Present on single-blog / favourite-toggle responses when authed. */
  isFavourite?: boolean;
  isLiked?: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  bio: string;
  favourites?: Blog[];
  createdAt?: string;
  updatedAt?: string;
}

/** GET /profile/:id — user enriched with their authored blogs. */
export interface UserProfile extends User {
  blogs: Blog[];
}

/** Paginated blog list payload. */
export interface BlogListPage {
  total: number;
  page: number;
  limit: number;
  blogs: Blog[];
}
