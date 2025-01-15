//SERVER-SIDE COMPONENT : HOME PAGE
import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home(
  {searchParams}:{searchParams : Promise<{query?:string}>}
  // searchParams is a Promise which will resolve into an optional query field of type string
) {

  // EVERY NEXTJS PAGE HAS ACCESS TO search Parameters inside URL, 
    //We just have to mention the correct type of the parameter the Promise will resolve to in TypeScript
    // Here accessing 'query' parameter of type string as when form is submitted 'query' is submitted to the URL as FORM is rendering at the server-side

    // Extracting this query from searchParams once promise is resolved
    const query = (await searchParams).query;

    const posts = [
      {
        _createdAt: new Date(),
        views: 55,
        author: {_id:1, name:'Shruti'},
        _id:1,
        description: "This is a description",
        image:"https://images.unsplash.com/photo-1593376853899-fbb47a057fa0?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category:"Robots",
        title:"We Robots",
      }
    ]





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
            
            posts.map((post,index) => (
              <StartupCard key={post?._id} post = {post}/>
            ))

          ):(

          
            <p className="no-results">No startups found</p>
          )}

        </ul>

      </section>
      
    </>
  );
}
