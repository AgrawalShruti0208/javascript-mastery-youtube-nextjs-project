// URL /startup/id : Dynamic Page for each startup to show details

// Implementing Partial Pre-Rendering by using both Static and Dynamic components in one page

import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React,  { Suspense } from 'react'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';


const md = markdownit();

const page = async ({params}:{params: Promise<{id: string}>}) => {
    
    // getting the id parameter from URL For the specific post
    const id = (await params).id; 

    /*
        * WHEN A COMPONENT HAS MULTIPLE FETCH SYSTEMS: There are Two Patters for that: SEQUENTIAL and PARALLEL FETCHING 
        
        *SEQUENTIAL FETCHING: 
                **When next fetch statement relies or depend on the executing fetch statement. 
                **They are written line by line normally.
                **LOAD TIME = REQUEST1 TIME + REQUEST2 TIME
                **If we write our two fetch statements SEQUENTIALLY:
                    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id} );
                    const {select: editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug: 'editor-picks'});
                
        * PARALLEL FETCHING MECHANISM:
                **Modern Mechanism for grouping TWO 'INDEPENDENT' FETCH STATEMENTS to run concurrently/parallely.
                **They are written in Promise.all to resolve both the statements at same time and store the result in array that can be descrutured to get ANSWER
                **LOAD TIME = TIME TAKEN BY THE LONGER REQUEST TO RESOLVE
                **Applied PARALLEL FETCHING IN THIS COMPONENT to fetch startup post data and editor-picks playlist in same Promise as they are INDEPENDENT

    */
    const [ post, {select: editorPosts} ] = await Promise.all(
        [
            client.fetch( STARTUP_BY_ID_QUERY, {id} ),
            client.fetch( PLAYLIST_BY_SLUG_QUERY,{slug: 'editor-picks'} )
        ]
    );
    

    if(!post){
        return notFound();
    }

    const parsedContent = md.render(post?.pitch || '');

    return (
        <>
            {/* Header Section */}
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(post?._createdAt)}</p>

                <h1 className='heading'>{post.title}</h1>

                <p className='sub-heading !max-w-5xl'>{post.description}</p>
            </section>

            <section className='section_container !max-w-4xl'>
                <img 
                    src={post.image} 
                    alt="thumbnail" 
                    className='w-full h-auto rounded-xl mx-auto drop-shadow-lg' 
                    
                />
            </section>

            <section className='section_container'>

                <div className='space-y-5 mt-5 max-w-4xl mx-auto'>
                    <div className='flex flex-col gap-5 sm:flex-row sm:flex-between '>
                        <Link 
                            href={`/user/${post.author?._id}`} 
                            className='flex gap-2 items-center mb-3'
                        >
                            <Image 
                                src={post.author?.image} 
                                alt = "avatar"
                                width = {64}
                                height = {64}
                                className='rounded-full drop-shadow-lg w-[64px] h-[64px]'
                            />

                            <div>
                                <p className='text-20-medium'>{post.author.name}</p>
                                <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
                            </div>

                        </Link>

                        <p className='category-tag !text-center'>{post.category}</p>
                    </div>

                    <h3 className='text-30-bold'>Pitch Details</h3>

                    {/* Pitch Details are in markdown format as it provides more features like heading, subheading, quotes, code format text etc. */}
                        {/* To Parse and present markdown in HTML String need new package => npm install markdown-it*/}
                    {parsedContent ?(
                        <article 
                            className='prose max-w-4xl font-work-sans break-all'
                            dangerouslySetInnerHTML={{__html:parsedContent}}
                        />
                    ):(
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <hr className='divider' />

                {editorPosts ?.length > 0 && (
                    <div className='max-w-4xl mx-auto'>
                        <p className='text-30-semibold'>Editor Picks</p>

                        <ul className='mt-7 card_grid-sm'>
                            {editorPosts.map((post: StartupTypeCard, index:number)=>(
                                <StartupCard key={index} post={post} />
                            ))}
                        </ul>
                    </div>
                )}

                {/* Dynamic Component: Page View when anyone visits the page number of view increases */}
                    <Suspense fallback={<Skeleton className='view-skeleton'/>}>
                        <View id={id} />
                    </Suspense>

            </section>


            
        </>
    )
}

export default page