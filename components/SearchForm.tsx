import React from 'react'
import Form from "next/form"
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'

const SearchForm = ({query}:{query?:string}) => {

  /*
    *TO ENSURE FORM renders on Server-side not client side NEXTJS Now Provides a FORM Component 
    * The <Form> component extends the HTML <form> element to provide prefetching of loading UI, 
    *    client-side navigation on submission, and progressive enhancement.

    * It's useful for forms that update URL search params as it reduces the boilerplate   
  */
    
  return (
    // ROBUST-SERVER-SIDE RENDERED FORM
    <Form action="/" scroll={false} className='search-form'>
        <input 
            name="query"
            defaultValue={query}
            className='search-input'
            placeholder='Search Startups..'
        />

        <div className='flex gap-2'>
            {/* We need a button to reset the form and clear the input which is client-side interacitivity which can be included in other component */}
            {query && <SearchFormReset />}

            <button type="submit" className='search-btn text-white'>
                <Search className='size-6' />
            </button>

        </div>

    </Form>
  )
}

export default SearchForm