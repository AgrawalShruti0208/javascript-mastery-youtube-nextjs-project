// From Auth.js documentation and Github Provider Instructions 
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({

  // Authentication via GitHub Provider and create session
  providers: [GitHub],

  // After creating session, we have make that check that AUTHOR matching the user exists or not
    //Using the QUERY from Sanity
      
    callbacks:{
    // callback functions to be performed during authentication and sign-in process
    
      // I. CALLBACK TO CREATE AUTHOR IN DATABASE DURING SIGN-IN IF NOT EXISTS
        async signIn({
          // this callback controls the sign-in process returning true or false
          
          user:{name, email, image},
          
          // profile: If OAuth provider is used, it contains the full OAuth profile returned by your provider.
          profile,
        
        }) {

          // 1. Checking if Author EXISTS in the database using the id returned by GitHub Provider
            //using SANITY Client and Query written to check author with gitHub id passed to it

              //IMPORTANT!! : setting useCdn: false is VERY IMPORTANT otherwise nextjs and sanity will check this information from cache and this can lead to problems
              //This will return AUTHOR INFORMATION if IT EXISTS else null
            const existingUser = await client
              .withConfig({useCdn:false})
              .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

          // 2. If not a existingUser i.e. Author is not present for the Signing-in user
            if(!existingUser){
              // create the Author in the database using writeClient
              await writeClient.create({
                _type: "author",
                id: profile?.id,
                name,
                username: profile?.login,
                email,
                image,
                bio: profile?.bio || "",
              });
            }
          
          // 3. return true to continue with sign-in process as now if Author for user does not exist in database it will be created first
          return true;
        },

      //II. CALLBACK TO ADD AUTHOR ID FROM SANITY INSIDE JWT TOKEN
        // After successful sign-in and author check, need to have the author ID from sanity to:
              //i. fetch author data for PROFILE SECTION
              //ii.to create A NEW STARTUP POST in database via frontend
        // TO GET ACCESS TO THE AUTHOR ID, Author id needs to be in the JWT Token stored inside session
        async jwt({token, account, profile}) {
          if(account && profile){

            // If account and profile exists then, fetch the author data from sanity database

            //IMPORTANT!! : setting useCdn: false is VERY IMPORTANT otherwise nextjs and sanity will fetch this information from cache and this can lead to problems
            //if user was created during authentication process then sanity and nextjs will not have updated cache and author id will not be added in the JWT so, set useCdn to false
            const user = await client
              .withConfig({useCdn:false}) //now user will be fetched in real-time
              .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile.id});
          
            // user will be there as Author in database as we have handled that case above before jwt token is created 
              // adding a new field inside jwt token (id) and storing the author ID in it
            
              token.id = user?._id;
          
          }

          // Now, if user is logged in and it has an existing author profile in database, its author id will be present inside JWT Token
            //return this updated JWT Token 
            return token;
        },

      // III. CALLBACK TO ADD AUTHOR ID FROM TOKEN TO SESSION
        //As the jwt callback had access to account,profile we had to first add the author id inside it in order to add it to the session
        //Session callback has only two parameters [session and token]
        //Now we have to update session object to include Author ID from token to session
        // And then we can simply access the AUTHOR ID in frontend 
        async session({session, token}) {

          // 1. assigning author id inside token to the session
            Object.assign(session, {id: token.id});

          //2. returning the modified session
            return session;

        },



  }
})