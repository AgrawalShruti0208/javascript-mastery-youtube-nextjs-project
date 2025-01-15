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
