// This sanity schema is for categorizing added startups based on different types

import { defineField, defineType } from "sanity";

// Basically Playlists of startups based on different categories
    //Each Playlist will have 
    //  a title, 
    //  a slug for unique-identification and 
    //  array of selected startups based on some criteria

export const playlist = defineType({
    name: 'playlist',
    title: 'Playlists',
    type: 'document',
    fields:[
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            // slug is an URL identifier to represent a resource
            name:"slug",
            type:"slug",
            options:{
                source:'title'
            }

        }),
        defineField({
            // creating a reference field to author schema
            name: "select",
            type: "array",
            of:[{type : 'reference', to:[{type: 'startup'}] }],
        }),
        
    ]
});