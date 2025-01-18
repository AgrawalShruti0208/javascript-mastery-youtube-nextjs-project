import {z} from 'zod';
// TypeScript-first schema validation with static type inference

export const formSchema = z.object({
    // object of ZOD providing all the fields with required validations

    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z
        .string()
        .url("The input must be a valid URL.") // Ensures it's a valid URL
        // to validate IMAGE URL for getting the link for images only
        .refine(
            (url) =>
                /\.(jpeg|jpg|gif|png|webp|svg|bmp|ico|tiff|jfif)$/i.test(url),
            {
                message: "The URL must point to a valid image file (e.g., jpg, png).",
            }
    ),
    pitch: z.string().min(10),
    
})