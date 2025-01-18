import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard'


const UserStartups = async ({id}:{id : string}) => {
  
    // getting all the startups that match the id passed by UserProfile page
    const startups = await client
        .withConfig({useCdn:false}) //fetch all the project including the new one
        .fetch(STARTUPS_BY_AUTHOR_QUERY,{id});


  return (
    <div>
        {startups?.length > 0 ? (
            // if startups array's length is more than 0 i.e. user has created some startups
            startups.map((startup: StartupTypeCard)=>(
                <StartupCard key={startup._id} post={startup} />
            ))

            
        ):(
            // if no startup exist for this author
            <p className='no-result'>No posts added yet!</p>
        )}
    
        
    </div>
  )
}

export default UserStartups