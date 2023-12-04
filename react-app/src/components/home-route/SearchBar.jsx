import React from 'react'
import { FaSearch } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import "./SearchBar.css"

function SearchBar() {
  return (
    <div className="search_container">
      <div className="input">
        <FaSearch className='icon' />
        <input type="text" placeholder="Search or start new chat   " />
      </div>
      <div className="filter">
        <BiMenuAltRight className='icon'/>
      </div>
    </div>
  )
}

export default SearchBar