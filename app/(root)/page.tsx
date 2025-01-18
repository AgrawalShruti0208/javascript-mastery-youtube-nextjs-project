//SERVER-SIDE COMPONENT : HOME PAGE

import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

// IMPORTS from sanity
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home(
  {searchParams}:{searchParams : Promise<{query?:string}>}
  // searchParams is a Promise which will resolve into an optional query field of type string
) {

  // EVERY NEXTJS PAGE HAS ACCESS TO search Parameters inside URL, 
    //We just have to mention the correct type of the parameter the Promise will resolve to in TypeScript
    // Here accessing 'query' parameter of type string as when form is submitted 'query' is submitted to the URL as FORM is rendering at the server-side

    // Extracting this query from searchParams once promise is resolved
    const query = (await searchParams).query;


    // creating a new variable params which will either contain the search query extracted from searchParams or NULL
    const params = {search: query || null};


    // Fetching data from Sanity in real-time using sanityFetch and QUERY defined in sanity/lib/queries.ts
    const {data: posts} = await sanityFetch({query:STARTUPS_QUERY, params});
    // passing params in sanityFetch to filter the posts if search params matches with the post's title, author or category


    // Although we are explicitly inserting author id inside session in "auth" file, session does not know it yet
      // We have to configure and provide a type for this "id" inside session and Jwt token i.e. make an addition to their interface
      // For this making new file in root directory of project "next-auth.d.ts"
    //console.log("Author ID from session",session?.id);


  return (
    <>
       {/* HERO-SECTION */}
      <section className="pink_container">

        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneurs</h1>
      
        {/* ! exclamation mark is used to override the styling of subHeading to include individual styling */}
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        {/* Input form to search for startups based on different criterias */}
          {/* Passing this search query inside the form component */}
          <SearchForm query={query} />
      
      </section>

      {/* Startups List display in the form of Cards */}
      <section className="section_container">
        <p className="text-30-semibold">
            {query ? `Search results for "${query}"`: 'All Startups'}
        </p>

        {/* Card-grid which displays the cards of startup in 2 or 3 columns based on specification */}
        <ul className="mt-7 card_grid">

          {posts?.length > 0 ? (
            
            posts.map((post) => (
              <StartupCard key={post?._id} post = {post}/>
            ))

          ):(

          
            <p className="no-results">No startups found</p>
          )}

        </ul>

      </section>

      <SanityLive />
      
    </>
  );
}
