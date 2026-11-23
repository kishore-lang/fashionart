import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(15, { message: "Phone number cannot exceed 15 digits." })
    .regex(/^[0-9+\s-]+$/, {
      message: "Please enter a valid phone number (digits and standard prefixes).",
    }),
  courseId: z.string().optional().nullable(),
  courseName: z.string().optional(),
  message: z
    .string()
    .min(5, { message: "Message should be at least 5 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
  // Honeypot field (must remain empty for human submissions)
  website_hp: z.string().max(0, { message: "Spam detected." }).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
