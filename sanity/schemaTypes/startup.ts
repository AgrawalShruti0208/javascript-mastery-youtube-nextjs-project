import { defineField, defineType } from "sanity";

export const startup = defineType({
    name: 'startup',
    title: 'Startups',
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
            name: "author",
            type: "reference",
            to:{ type: 'author'}
        }),
        defineField({
            name: "views",
            type: "number",
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name: "category",
            type: "string",
            // Defining validation Rule on category that it should be between 1-20 characters and is a required field
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category"),
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule)=> Rule.required(),
        }),
        defineField({
            name: "pitch",
            // markdown is a custom field type which uses a special markdown plugin provided by sanity
            //we have to install this plugin externally =>npm install sanity-plugin-markdown
            type: "markdown",
        }),
    ]
})