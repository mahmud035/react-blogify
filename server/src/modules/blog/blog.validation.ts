import { z } from 'zod';

/**
 * Tags arrive from multipart forms as a comma-separated string (legacy client)
 * or as a JSON array. Normalise both to a trimmed string[].
 */
const tagsSchema = z.preprocess((val) => {
  if (Array.isArray(val)) return val.map((t) => String(t).trim()).filter(Boolean);
  if (typeof val === 'string') {
    return val.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
}, z.array(z.string()));

const createBlogSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Content is required'),
  tags: tagsSchema,
});

const updateBlogSchema = z.object({
  title: z.string().trim().min(1).optional(),
  content: z.string().trim().min(1).optional(),
  tags: tagsSchema.optional(),
});

const commentSchema = z.object({
  content: z.string().trim().min(1, 'Comment content is required'),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type CommentInput = z.infer<typeof commentSchema>;

export const blogValidation = { createBlogSchema, updateBlogSchema, commentSchema };
