// SCHEMA DEFINITION FOR AUTHOR DATA RECEIVING FROM GITHUB AFTER AUTHENTICATION

import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

// Exporting autor schema
export const author = defineType({
    name:"author",
    title:"Author",
    type: 'document',
    icon: UserIcon,
    fields: [
        // defining each field with its type
        defineField({
            name: 'id',
            type: 'number',
        }),
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'username',
            type: 'string',
        }),
        defineField({
            name: 'email',
            type: 'string',
        }),
        defineField({
            name: 'image',
            type: 'url',
        }),
        defineField({
            name: 'bio',
            type: 'text',
        }),
    ],
    preview:{
        // SELECT Authors by name and preview them
        select:{
            title: "name",
        }
    }

})