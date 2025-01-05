import './Search.css';

import { SearchBar } from '../../header/searchBar';


import { Outlet } from 'react-router-dom';

function Search() {

    const { handleSubmit, handleChange, value, result } = SearchBar();
console.log(result, "and ", value)

    return(
        <>
        <form id="search"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  id="search-field"
                  className="blink search-field"

                  value={value}
                  onInput={handleChange}
                  required

                />
                <i id="IconNoClick" className="bx bx-search bx-tada" ></i>
              </form>
              <h4>{result}</h4>
        <Outlet />
        </>
    )
}

export default Search;