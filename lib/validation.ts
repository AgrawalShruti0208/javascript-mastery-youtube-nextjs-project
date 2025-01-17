import {z} from 'zod';
// TypeScript-first schema validation with static type inference

export const formSchema = z.object({
    // object of ZOD providing all the fields with required validations

    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url().refine(async(url)=>{

        // to validate IMAGE URL for getting the link for images only
        try{

            // get the part of the url required to check the type of content of that URL
            const res = await fetch(url, {method: 'HEAD'});
            const contentType = res.headers.get("content-type");

            // if content is of type "image"
            return contentType?.startsWith("image/");

        }catch{
            return false;
        }

    }),
    pitch: z.string().min(10),
    
})