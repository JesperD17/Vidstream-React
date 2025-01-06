import './Search.css';

import { useLocation } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

function Search() {
  // grabs the url afer /Search
  const location = useLocation();
  const searchQuery = location.search;
  var newQuery = searchQuery.replace('?q=', '') // onscreen search result


  return (
    <>
      <h2>Searched for: {newQuery}</h2>
      <Outlet />
    </>
  )
}

export default Search;