import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY, STARTUPS_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import StartupCard, { StartupTypeCard } from './StartupCard';

type ComponentProps = {
  params?: { search: string | null }; // Params object with a search field
  id?: string;            // Optional, must be a string if provided
};

const UserStartups: React.FC<ComponentProps> = async ({ params, id }) => {

  let startups: StartupTypeCard[] = []; // Declare startups outside the if blocks

  if (params) {

    const { search } = params; // Destructure the search field from params

    // Fetching post data from Sanity
    startups = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUPS_QUERY, { search });
  }

  if (id) {
    // Getting all the startups that match the id passed by UserProfile page
    startups = await client
      .withConfig({ useCdn: false }) // Fetch all the projects including the new one
      .fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  }


  return (
    <>
      {startups?.length > 0 ? (
        // If startups array's length is more than 0 i.e. user has created some startups
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        // If no startup exists for this author
        <p className="no-result">No posts added yet!</p>
      )}
    </>
  );
};

export default UserStartups;
