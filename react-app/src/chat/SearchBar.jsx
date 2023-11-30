import React from 'react'
import "./searchbar.css"
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div class="search-container">
        <div class="input">
        <FaSearch className='search' />
          <input type="text" placeholder="Search or start new chat   "/>
          </div>
      </div>
  )
}

export default SearchBar