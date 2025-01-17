import { DefaultSession } from "next-auth"
import {DefaultJWT} from "next-auth/jwt"

declare module "next-auth" {
    // creating a new module with two interfaces Session and JWT
        //letting session and jwt token know that they will now have id inside them of type string
        
    interface Session extends DefaultSession {
        // extending Session interface to include id field
        id: string
    }

    interface JWT {
        // extending JWT token interface to include id field
        id: string
    }
}