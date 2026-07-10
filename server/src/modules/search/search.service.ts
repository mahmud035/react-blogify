import { Blog } from '../blog/blog.model';

/** Escapes user input so it can be used safely inside a RegExp. */
function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Case-insensitive blog title search. */
const searchBlogs = async (query: string) => {
  const results = await Blog.find({
    title: { $regex: escapeRegex(query), $options: 'i' },
  })
    .sort({ createdAt: -1 })
    .populate('author', 'firstName lastName avatar');

  return { count: results.length, query, results };
};

export const searchService = { searchBlogs };
