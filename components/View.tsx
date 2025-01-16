import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View = async ({id}:{id:string}) => {

//   Getting number of views in real-time from sanity
    const {views : totalViews} = await client
        .withConfig({useCdn:false}) //useCdn: false to not fetch data from cache but instantly from sanity
        .fetch(STARTUP_VIEWS_QUERY, {id});

// Updating number of views when someone visits on this page using writeClient and configuring it
    // But if we don't wrap this in "after" this will block UI until the operation is performed, to handle the side-effect and perform operation in background wrapping it up
//    after: This function allows you to schedule callbacks to be executed after the current request finishes.
   after(async()=>{
    await writeClient
    .patch(id) //patch to perform update on document with this id
    .set({views: totalViews+1}) //set number of views +1
    .commit(); //commit this patch update which will resolve to updated result

   })
   
    
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>

        <p className='view-text'>
            <span className='font-black'>{totalViews} {totalViews>2 ? 'Views' : 'View'}</span>
        </p>

    </div>
  )
}

export default View