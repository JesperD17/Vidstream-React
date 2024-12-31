import "./Sources.css";

import { Outlet } from "react-router-dom";

function Source() {

    return(
        <>
        <div>Sources</div>
        <Outlet />
        </>
    )
}

export default Source;