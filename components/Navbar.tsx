import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// getting auth from auth.ts
import { auth , signIn , signOut} from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'

// shadcn component
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const Navbar =async() =>{

//   session is received from auth() as it is an asynchronous operation so using async-await
  const session = await auth();
  

  return (
    // Here in Navbar, implementation of nextAuth will be done
    <header className='px-2 sm:px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-end items-center w-[100%]'>
            <Link href="/" className='w-[50%]'>
                <Image src="/Nextjs Project Logo.png" alt="logo" width={144} height = {30} priority/>
            </Link>

            <div className='flex items-center gap-4 sm:5 text-black w-[50%] justify-end'>
                {/* This part needs to be visible only when user is logged in */}
                    {/* This can be determined by the user session provided by nextAuth*/}
                
                    {/* If session is present and session has user then, */}
                    {session && session?.user ?(
                        <>
                            {/* Link to create a data entry */}
                                <Link href="/startup/create">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button>
                                                    <span className='max-sm:hidden py-2 px-4 text-lg font-semibold  border border-pink-500 rounded hover:bg-[#ff3679] hover:text-white transition duration-300 active:scale-95'>Create</span>
                                                    <BadgePlus className='size-9 p-[2px] drop-shadow-md sm:hidden bg-slate-100 rounded-full active:scale-95 active:bg-black active:text-white'/>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent className='mt-2 bg-black text-white'>
                                                <p>Create new Pitch</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>

                            {/* Logout button inside form with server action having signout provided by nextAuth to sign out from gitHub Account */}
                                
                                <form action={
                                    // server action to sign out
                                    async()=>{
                                        "use server"

                                        // When user click on signout, after signout process redirect them to the Home Page
                                        await signOut({redirectTo:"/"});

                                    }
                                }>
                                    <button type="submit">
                                        {/* For small screens icon will appear and for large screen text will be displayed */}
                                        <span className='max-sm:hidden px-4 py-2 text-center text-lg font-semibold text-gray-800 border border-gray-400 rounded hover:bg-black hover:text-white transition duration-300 active:scale-95'>Logout</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <LogOut className='size-9 p-[2px] sm:hidden drop-shadow-md text-red-500 rounded-md bg-slate-100 active:scale-95 active:bg-red-500 active:text-white'/>
                                                </TooltipTrigger>
                                                <TooltipContent className='mt-2 bg-black text-white sm:hidden'>
                                                    <p>Log Out!</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </button>
                                </form>

                            {/* Link to user profile by clicking on user's name extracted using session.user */}
                                <Link href={`/user/${session?.id}`} className='bg-gray-100 rounded-full p-[2px] drop-shadow-md flex justify-center items-center hover:bg-slate-200 hover:drop-shadow-none transition duration-300 active:scale-95'>
                                {/* shadcn component to display avatar of user and provide fallback for it and display tooltip */}

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Avatar className='size-9'>
                                                    <AvatarImage 
                                                            src={session.user?.image || ''}
                                                            alt={session.user?.name || ''} 
                                                    />
                                                    <AvatarFallback className='text-xl bg-primary text-white font-bold animate-pulse rounded-full border-2 border-gray-400'>{session.user?.name?.charAt(0) || 'AV'}</AvatarFallback>
                                                </Avatar>
                                            </TooltipTrigger>
                                            <TooltipContent className='mt-2 bg-black text-white'>
                                                <p>View Profile</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

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
                                <button type= "submit" className='px-4 py-2 text-center text-lg font-semibold text-gray-800 border border-gray-400 rounded hover:bg-black hover:text-white transition duration-300 active:scale-95'>Login</button>

                            </form>
                        
                    )}

            </div>
        </nav>
    </header>
  )
}

export default Navbar