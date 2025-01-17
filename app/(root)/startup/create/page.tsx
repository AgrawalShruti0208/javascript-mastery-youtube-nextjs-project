import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation';
import React from 'react'


const CreatePage = async () =>{
    // THIS PAGE IS ON URL "http://localhost:3000/startup/create" and this needs to be a protected route
        // User needs to be LOGGED-IN to Create a Startup Post
        // Therefore, we need to setup a functionality that USER CAN VIEW THIS PAGE ONLY IF LOGGED-IN
    
    // Getting session information from "auth" file 
        const session = await auth();

    // IF THERE IS NO SESSION, therefore USER is not LOGGED-IN, REDIRECT THE USER TO HOME PAGE if trying to access the page from URL
        if(!session){
            redirect("/");
        }
        
    // Now ONLY AUTHENTICATED USER CAN VIEW THIS PAGE and ADD A STARTUP POST
    return (
    <>
        <section className='pink_container !min-h-[230px]'>

            <h1 className='heading'>Submit Your Startup</h1>

        </section>
        {/* Now we have to implement a Form component to get all the input from the user */}
                {/* Implementing a new child CLIENT component "StartupForm" for this in /components folder */}
                <StartupForm />
    </>
  )
}

export default CreatePage