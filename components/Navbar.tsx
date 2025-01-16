import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// getting auth from auth.ts
import { auth , signIn , signOut} from '@/auth'

const Navbar =async() => {

//   session is received from auth() as it is an asynchronous operation so using async-await
  const session = await auth();

  return (
    // Here in Navbar, implementation of nextAuth will be done
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/Nextjs Project Logo.png" alt="logo" width={144} height = {30} priority/>
            </Link>

            <div className='flex items-center gap-5 text-black'>
                {/* This part needs to be visible only when user is logged in */}
                    {/* This can be determined by the user session provided by nextAuth*/}
                
                    {/* If session is present and session has user then, */}
                    {session && session?.user ?(
                        <>
                            {/* Link to create a data entry */}
                                <Link href="/startup/create">
                                    <span>Create</span>
                                </Link>

                            {/* Logout button inside form with server action having signout provided by nextAuth to sign out from gitHub Account */}
                                {/* <button onClick={signOut}>
                                    <span>Logout</span>
                                </button> */}
                                <form action={
                                    // server action to sign out
                                    async()=>{
                                        "use server"

                                        // When user click on signout, after signout process redirect them to the Home Page
                                        await signOut({redirectTo:"/"});

                                    }
                                }>
                                    <button type="submit">Logout</button>
                                </form>

                            {/* Link to user profile by clicking on user's name extracted using session.user */}
                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>

                    ):(
                        // If session is not present

                        // As onClick is a user interaction and we have to perform an action like signIn and signOut on server 
                            // We have to create server action using <form action=""> to trigger the server action directly from the component 
                            // This sign in and signout are asynchronous operations therefore require async and await  
                            <form action={

                                // server action to Sign In to GitHub to authorize yourself to access the project

                                async()=>{
                                    "use server" //directive to indicate that this action to be performed via server

                                    await signIn('github');
                                }

                            }>
                                <button type= "submit">Login</button>

                            </form>
                        
                        
                        
                        
                    )}

            </div>
        </nav>
    </header>
  )
}

export default Navbar