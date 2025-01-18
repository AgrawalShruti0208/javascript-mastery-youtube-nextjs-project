import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author}

const StartupCard = ({post}:{post: StartupTypeCard}) => {
// CARD Component for POST 
  return (
    <li className='startup-card group'>

        {/* FIRST Part of the card */}
            <div className='flex-between'>

                <p className='startup_card_date'>
                    {formatDate(post._createdAt)}
                </p>

                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-16-medium'>{post.views}</span>
                </div>

            </div>
        
        {/* SECOND Part of the card */}
            <div className='flex mt-5 gap-3 w-[100%]'>

                <div className='flex-1 w-[75%]'>

                    <Link href={`/user/${post.author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>{post.author?.name}</p>
                    </Link>

                    <Link href={`/startup/${post?._id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>{post?.title}</h3>
                    </Link>

                </div>
                <Link href={`/user/${post.author?._id}`} className='w-[25%] flex justify-end items-center'>
                    <Image 
                        src={post.author?.image || ''} 
                        alt={post.author?.name || 'Author Image'}
                        width={48}
                        height={48}
                        className='rounded-full'
                    />
                </Link>

            </div>

            <Link href={`/startup/${post?._id}`}>
                <p className='startup-card_desc'>{post?.description}</p>

                <img src={post?.image} alt='placeholder' className='startup-card_img' />
            </Link>

            <div className='flex-between gap-3 mt-5'>

                <Link href={`/?query=${post.category?.toLowerCase()}`}>
                    <p className='text-16-medium'>{post.category}</p>
                </Link>

                <Button className="startup-card_btn" asChild >
                    <Link href={`/startup/${post?._id}`}>
                        Details
                    </Link>
                </Button>

            </div>


    </li>
  );
};

// Skeleton for StartupCard until it appears on screen
export const StartupCardSkeleton = () => (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
);

export default StartupCard