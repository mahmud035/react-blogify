import { z } from 'zod';

// Only these fields may be self-updated. Email/password/favourites are managed
// through dedicated flows, not the profile edit endpoint.
const updateProfileSchema = z.object({
  firstName: z.string().trim().min(1).optional(),
  lastName: z.string().trim().min(1).optional(),
  bio: z.string().max(500).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const userValidation = { updateProfileSchema };
