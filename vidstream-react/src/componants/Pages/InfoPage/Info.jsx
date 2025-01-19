import "./Info.css";

import SkeletonLoader from "../../skeletonS/skeletenLoader";

import { Outlet } from "react-router-dom";

function Info() {
    
    return (
        <>
            <SkeletonLoader />
            <div id="Empty">info</div>
            <Outlet />
        </>
    )
}

export default Info;