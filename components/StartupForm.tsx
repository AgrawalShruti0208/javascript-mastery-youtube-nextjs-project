"use client" //client side component as it involves user interactivity

import React, { useState, useActionState } from 'react'
import { Input } from './ui/input' 
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import {z} from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';


const StartupForm = () =>{

    // State variable as an Object to store any errors 
        // as this object will contain errors as string: string KEY-VALUE pair
        // we have to specify the type in TypeScript
        const [errors, setErrors] = useState<Record<string,string>>({});

    //State variable for Markdown Editor
        const [pitch, setPitch] = useState("");

        // useToast hook from shadcn created hooks folder
        const {toast} = useToast();

        // router hook to go to the newly created startup details page
        const router = useRouter();



    // function handleFormSubmit that is a function which will handle form submission
    const handleFormSubmit= async (prevState:any, formData: FormData)=>{
        // prevState: previous state of the FORM

        try {

            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }

            // FORM SUBMISSION requires input validation which we will perform in different file "/lib/validation" using ZOD
                //getting formSchema from that file and passing formValues in it to validate them
                
                await formSchema.parseAsync(formValues);

                // if the form values match the validation, continue..
                const result = await createPitch(prevState, formData, pitch);

                if(result.status === 'SUCCESS'){

                    // success toast
                    toast({
                        title: 'Success',
                        description: "Your startup pitch has been created successfully",
                    });

                    // Change URL to newly created startup details page
                    router.push(`/startup/${result._id}`);
                }

                return result;

            
        } catch (error) {
            // if error occured 

            if(error instanceof z.ZodError){
                // if error is coming from "ZOD Validation"

                // getting errors based on field inputs 
                const fieldErrors = error.flatten().fieldErrors;

                // setting state of errors and matching the type
                setErrors(fieldErrors as unknown as Record<string, string>);

                // To display a Toast having error message 
                    // include <Toast> component from shadcn in app/layout.tsx 
                    // and use const {toast} = useToast() hook from shadcn ui
                    toast({
                        title: 'Error',
                        description: 'Please check your inputs and try again!',
                        variant:'destructive'
                    });

                // returning form state, error and status
                return{...prevState, error:"Validation Failed!", status:"ERROR"};

            }

            toast({
                title: 'Error',
                description: "An unexpected error has occured!",
                variant:'destructive'
            });

            // if some other error occured
            return{...prevState, error:"An unexpected error has occured!", status:"ERROR"};
            
        }

        

    }

    // Using React Hook "useActionState" : useActionState is a Hook that allows you to update state based on the result of a form action.
        // Read more on: https://react.dev/reference/react/useActionState
        //You pass useActionState an existing form action function, an initial state, 
        // and it returns a new action that you use in your form, the latest form state and whether the Action is still pending.
        const [state, formAction, isPending] = useActionState(
            handleFormSubmit,
            {
                error:'',
                status: "INITIAL",
            }
        );

  return (
    <form action={formAction} className='startup-form'>
        {/* This Form will use many shadcn components so importing them and then will use them here */}

        {/* Input for Startup Title */}
            <div>
                <label htmlFor="title" className='startup-form_label'>Title</label>

                <Input
                    id='title'
                    name='title'
                    className='startup-form_input'
                    required
                    placeholder='Startup Title'
                />

                {errors.title && <p className='startup-form_error'>{errors.title}</p>}
            </div>

        {/* Input for Startup Description */}
            <div>
                <label htmlFor="description" className='startup-form_label'>Description</label>

                <Textarea
                    id= 'description'
                    name='description'
                    className='startup-form_textarea'
                    required
                    placeholder='Startup Description'
                />
                
                {errors.description && <p className='startup-form_error'>{errors.description}</p>}
            </div>

        {/* Input for Startup Category */}
            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>

                <Input
                    id='category'
                    name='category'
                    className='startup-form_input'
                    required
                    placeholder='Startup Category (Tech, Health, Education...)'
                />
                
                {errors.category && <p className='startup-form_error'>{errors.category}</p>}
            </div>

        {/* Input for Startup Image Link */}
            <div>
                <label htmlFor="link" className='startup-form_label'>Image URL</label>

                <Input
                    id='link'
                    name='link'
                    className='startup-form_input'
                    required
                    placeholder='Paste a link to your demo or promotional thumbnail'
                />
                
                {errors.link && <p className='startup-form_error'>{errors.link}</p>}
            </div>
        
        {/* Now for Pitch Input we need a Markdown Editor as it provides many editing options */}
            {/* To do so installing Markdown editor package => npm i @uiw/react-md-editor */}
            <div data-color-mode="light">
                <label htmlFor="pitch" className='startup-form_label'>Pitch</label>

                <MDEditor
                    value={pitch}
                    // onChange has a callback which will set the entered value to state variable as "string" data type
                    onChange={(value)=>setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    className='startup-form_editor'
                    style = {{borderRadius:20, overflow: "hidden", marginTop:10}}
                    textareaProps={{
                        placeholder:"Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        // only basic markdown styling will be allowed
                        disallowedElements:["style"],
                    }}
                />
                
                {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
            </div>
        
        {/* Submission Button */}
            <Button 
                type='submit' 
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className={`startup-form_btnIcon size-10 ${isPending && 'animate-pulse'}`} />
            </Button>


    </form>
  )
}

export default StartupForm