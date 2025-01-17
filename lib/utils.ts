import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// files to add helper functions 

// convert date into proper format

export function formatDate(date:string){
  return new Date(date).toLocaleDateString('en-US',{
    month: 'long',
    day: "numeric",
    year: 'numeric'
  })
}


// helper function to parse the returning object of server action in proper format
export function parseServerActionResponse<T>(response:T){
    return JSON.parse(JSON.stringify(response));
}
