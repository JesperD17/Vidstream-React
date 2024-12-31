import "./Movies.css";

import { Outlet } from "react-router-dom";

function Movies() {

    return(
        <>
        <div>Movies</div>
        <Outlet />
        </>
    )
}

export default Movies;