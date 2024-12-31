import './Search.css';

import { Outlet } from 'react-router-dom';

function Search() {

    return(
        <>
        <div>Search</div>
        <Outlet />
        </>
    )
}

export default Search;