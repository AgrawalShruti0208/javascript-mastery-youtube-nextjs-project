import { defineQuery } from "next-sanity";

// QUERY IS TO FETCH THE POSTS
export const STARTUPS_QUERY= 
    defineQuery(
        // SANITY uses GROQ Query to perform operations  
            // type of schema => startup 
                // and fetch all those who has slug defined
                // and fetch all if search is null
                // OR fetch those whose title match the search
                // OR fetch those whose category match the search
                //OR fetch those whose author name matches the search
            //SORT THEM IN DESCENDING ORDER according to createdAt so that latest added post appears at top

            // Author is reference field in Startup dataset, so we have to describe explicitly what fields of author we require in the query
        ` *[_type == "startup" 
                && defined(slug.current)
                && !defined($search)
                || title match $search
                || category match $search
                || author->name match $search 
            ] | order(_createdAt desc) {
        _id,
        title,
        slug,
        _createdAt,
        author -> {
            _id,name, image, bio
        },
        views,
        description,
        category,
        image
    }`
);

// QUERY TO FETCH SPECIFIC POST BY ITS ID
export const STARTUP_BY_ID_QUERY = defineQuery(
       //$id is passed to the query by frontend client.fetch and then here it is compared with document _id
        // to find the document of type 'startup' and _id == id passed to the query
    `*[_type == "startup" && _id == $id][0]{
        _id,
        title,
        slug,
        _createdAt,
        author -> {
            _id,name,username,image, bio
        },
        views,
        description,
        category,
        image,
        pitch
    }`
);

//QUERY TO FETCH NUMBER OF VIEWS FROM A POST IN REAL-TIME USING ITS ID
export const STARTUP_VIEWS_QUERY= defineQuery(
    `*[_type == "startup" && _id == $id][0]{
        _id,views
        
    }`
);

/**AUTHOR-AUTHENTICATION FLOW
    * If user signs-in using GitHub after authentication, a session is created using which we are displaying Logout options, create startup post 
    * If a session exists, and in session user exists THEN, We need to have a AUTHOR dedicated to the user in the DATABASE
    * If AUTHOR representing logged in user exists in the database, he can directly create a new startup post in the database through Frontend
    * But if Author does not exist, create author for the logged in user
*/
//QUERY TO CHECK AUTHOR WITH THE CURRENT LOGGED IN USER'S GITHUB ID EXISTS IN DATABASE OR NOT
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
    // Get all the documents matching type=='author' and id == 'passed id to query'
        //And return the first document's data with all the fields mentioned
    `*[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }`
)