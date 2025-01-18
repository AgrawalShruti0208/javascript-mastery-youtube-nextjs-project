import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, {Suspense} from 'react'
import Image from 'next/image';
import UserStartups from '@/components/UserStartups';
import {Skeleton} from '@/components/ui/skeleton'
import { StartupCardSkeleton } from '@/components/StartupCard';


const UserProfile = async({params}:{params: Promise<{id:string}>}) => {

  // getting id from the URL
  const id = (await params).id;

  // fetch user details from database using the Author ID extracted from URL
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});

  if(!user){ //if user with this ID Does not exist redirect to 404 not found page
    return notFound();
  }

  // getting session 
  const session = await auth();

  return (
    <>
      <section className='profile_container'>
        <div className='profile_card'>
          <div className='profile_title'>
            <h3 className='text-24-black uppercase text-center line-clamp-1'>{user.name}</h3>
          </div>

          <Image 
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className='profile_image' 
          />

          <p className='text-2xl font-bold text-white mt-7 text-center'>@{user?.username}</p>

          <p className='mt-1 text-center text-14-normal'>{user?.bio}</p>

        </div>

        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
          
          <p className='text-30-bold'>
            {session?.id === id ? "Your" : "All"} Startups
          </p>

          <ul className='card_grid-sm'>
            {/*List of Startups created by user is dynamic and can change so need to implement it separately */}
              {/* Wrapping it up in Suspense by React as this is dynamic and will display fallback if UserStartups are loading*/}
              
              <Suspense fallback={<StartupCardSkeleton />}>
                <UserStartups id={id} />
              </Suspense>
              

          </ul>
        </div>

      </section>
    </>
  )
}

export default UserProfile