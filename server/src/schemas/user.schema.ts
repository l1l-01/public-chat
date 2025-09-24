import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  createdDate: z.date().optional(),
});

export type UserInput = z.infer<typeof UserSchema>;
