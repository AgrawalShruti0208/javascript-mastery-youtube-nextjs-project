"use client" //Turning only this reset button in client-side component to be rendered at client-side

import React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const SearchFormReset = () => {
 
  const reset = () =>{
    
    // getting the whole form component
    const form = document.querySelector('.search-form') as HTMLFormElement;

    if(form){
        // if form is selected, reset the form
        form.reset();
    }

  }


  return (
    <button type="reset" onClick={reset}>
        <Link href='/' className='search-btn text-white'>
            <X className='size-6' /> 
        </Link>
    </button>
  )
}

export default SearchFormReset