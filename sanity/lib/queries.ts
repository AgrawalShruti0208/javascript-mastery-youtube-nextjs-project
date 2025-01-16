import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY= 
    defineQuery(
        // SANITY uses GROQ Query to perform operations here this QUERY IS TO FETCH THE POSTS 
            // type of schema => startup 
                // and fetch all those who has slug defined
                // and fetch all if search is null
                // OR fetch those whose title match the search
                // OR fetch those whose category match the search
                //OR fetch those whose author name matches the search
            //SORT THEM IN DESCENDING ORDER according to createdAt so that latest added post appears at top

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

export const STARTUP_BY_ID_QUERY = defineQuery(
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

export const STARTUP_VIEWS_QUERY= defineQuery(
    `*[_type == "startup" && _id == $id][0]{
        _id,views
        
    }`
);