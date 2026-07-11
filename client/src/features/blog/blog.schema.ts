import { z } from 'zod';

/** Shared create/edit blog form. Thumbnail is optional on edit (see refine). */
export const blogSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  tags: z.string().trim().min(1, 'Tags are required'),
  content: z.string().trim().min(1, 'Blog content is required'),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

export const commentSchema = z.object({
  content: z.string().trim().min(1, 'Please write something about the blog!'),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
