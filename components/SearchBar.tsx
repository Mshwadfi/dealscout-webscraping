"use client";

import useIsValidUrl from "@/hooks/useIsValidUrl";
import { scrapAndStoreProduct } from "@/lib/actions";
import { url } from "inspector";
import { FormEvent, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidUrl = useIsValidUrl(query);
    if (!isValidUrl) setErrorMessage(true);
    else setErrorMessage(false);  
    console.log('clicked')

    try {
      
      const product = await scrapAndStoreProduct(query);
      console.log(product);
    } catch (error) {
      
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mt-10 relative">
      <label htmlFor="search-input" className="sr-only">Search for a product</label>
      <input
        id="search-input"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
        aria-invalid={errorMessage ? "true" : "false"}
        aria-describedby="error-message" 
      />

      <button type="submit" className="searchbar-btn">
        {'Search'}
      </button>

      {errorMessage && (
        <div
          id="error-message"
          className="absolute text-red-600 text-sm mt-2 left-0 top-12 w-[70%] transition-all duration-300 opacity-100 transform translate-y-0"
        >
          <div className="relative bg-red-100 border-l-4 border-red-600 p-2 rounded-lg shadow-md">
            <p>
              Oh no! This doesn't look like a valid link. Please check again.
            </p>
            <button
              onClick={closeErrorMessage}
              className="absolute top-2 right-2 text-black font-extrabold hover:text-red-800 focus:outline-none"
              aria-label="Close error message"
            >
              &#10005; 
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
