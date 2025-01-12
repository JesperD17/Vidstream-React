import "./Status.css";

import StatusSkeleton from "./StatusSkeleton";

import useSWR from 'swr';
import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Status() {
    const {
        data: allMovies,
        error,
        isValidating,
    } = useSWR('https://vidstream-api.vercel.app/home', fetcher, { // settings to stop swr from reloading.
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const [messageState, setMessageState] = useState(true); // first image is 0

    useEffect(() => {
        // if(allMovies) {
        //     setMessageState(true)
        // }
        if (error) {
            console.log("FAILED OR INCOMPLETE API!")
            setMessageState(false)
            // messageState = false
        }
    }, [allMovies, isValidating, error])
    
    if (isValidating) { 
        <StatusSkeleton />
    }
    
    var titleMessage = "This web is a personal code project."
    return (
        <>
            <div id="WrapperActive">
                {messageState ?
                    <>
                        <div className="ActiveMessage">
                            <div className="projectMessage">{titleMessage}</div>
                            <i className='bx bxs-check-circle' ></i>
                            <div className="ActiveTextWrapper">
                                <div className="ActiveText">This web IS receiving data right now</div>
                                <div className="ActiveText">There are no errors seen right now</div>
                                <div className="ActiveText"></div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="ErrorMessage">
                            <div className="projectMessage">{titleMessage}</div>
                            <i className='bx bxs-error'></i>
                            <div className="ErrorTextWrapper">
                                <div className="ErrorText">This web is NOT receiving data at the moment</div>
                                {/* <div className="ErrorText">There ARE errors seen at the moment</div> */}
                                <div className="ActiveText">There are no errors seen right now</div>
                                <div className="ActiveText">There are no other errors seen right now</div>
                            </div>
                        </div>
                    </>}
            </div>
            <Outlet />
        </>
    )
}

export default Status;