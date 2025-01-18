// SERVER ACTION FILE TO CREATE STARTUP DOCUMENT IN SANITY FROM FORM DATA
'use server'

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify'
import { writeClient } from "@/sanity/lib/write-client";


export const createPitch = async(state:any, form:FormData, pitch:string)=>{

    // getting access to session as we need Author id
    const session = await auth();

    if(!session){

        // We need to return an object from server action but we cannot pass the obj directly
            //therefore using a helper function to parse it from 'utils' file
        return parseServerActionResponse(
            {
                error: 'Not signed in',
                status:'ERROR',
            }
        );
    }

      const title = form.get('title');
      const description = form.get('description');
      const category = form.get('category');
      const link = form.get('link');

    //   we also need slug- 'unique url indentifier' for startup document in sanity
        // to make slug of title using package 'slugify' => npm i slugify
        const slug = slugify(title as string,{lower:true, strict:true});

        try {
            // Creating Startup Document's Object
                const startup = {
                    title,
                    description,
                    category,
                    image: link,
                    slug:{
                        _type: slug,
                        current: slug
                    },
                    author:{
                        _type: 'reference',
                        _ref: session?.id,
                    },
                    pitch,
                };

            // Creating the startup document using writeClient
                const result = await writeClient.create({
                    _type:"startup",
                    ...startup //passing the startup object by destructuring operator
                })
            
            // returning the Success status if successful in saving the document
                return parseServerActionResponse({
                    ...result,
                    error:'',
                    status:'SUCCESS'
                })
            
            
        } catch (error) {

            // If ERROR occurs in creating startup document, console the error and send it to the client component

                console.log(error);

                return parseServerActionResponse(
                    {
                        error: JSON.stringify(error),
                        status:'ERROR',
                    }
                );

        }

}