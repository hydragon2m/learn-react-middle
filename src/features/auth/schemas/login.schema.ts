import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'auth.validation.email_required').email('auth.validation.email_invalid'),
  password: z.string().min(1, 'auth.validation.password_required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
