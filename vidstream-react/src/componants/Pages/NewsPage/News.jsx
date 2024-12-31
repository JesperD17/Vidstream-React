import "./News.css";

import { Outlet } from "react-router-dom";

function News() {

    return(
        <>
        <div>News</div>
        <Outlet />
        </>
    )
}

export default News;