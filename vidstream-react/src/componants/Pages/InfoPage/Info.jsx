import "./Info.css";

import { Outlet } from "react-router-dom";

import Skeleton from "../../skeleton/skeleton";

import { useState, useEffect, useRef } from "react";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Info() {
    const {
        data: allMovies,
        error,
        isValidating,
    } = useSWR('https://vidstream-api.vercel.app/home', fetcher, { // settings to stop swr from reloading.
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    const [slideIndex, setslideIndex] = useState(0); // first image is 0
    const intervalRef = useRef(null); // using ref to clearinterval in other functions

    useEffect(() => { // timer for the spotlight slideshow
        if (!allMovies) return; // waits until allMovies isnt empty
        intervalRef.current = setInterval(() => {
            toRightImage();
        }, 5000);
        return () => clearInterval(intervalRef.current);

    }, [allMovies]) // sees changes when loaded.

    if (error) return console.log("FAILED OR INCOMPLETE API!");
    if (isValidating) { // || allMovies.latestMovies.length === 0 || allMovies.latestTvSeries.length === 0 || allMovies.trending.movies.length === 0 || allMovies.trending.tvSeries.length === 0
        return <Skeleton />;
    }


    const spotlightLength = allMovies.spotlight.length;
    const repeatSpotlightBannerDivs = new Array(spotlightLength).fill(null);

    function toLeftImage() {
        setslideIndex(index => {
            console.log(index)
            if (index === 0) return spotlightLength - 1 // if below 0 of spotlight list, returns last spotlight.
            return index - 1;
        })
    }

    function toRightImage() {
        setslideIndex(index => {
            if (index === spotlightLength - 1) return 0
            return index + 1;
        })
    }

    function leftAndClear() { // stops the timer when using buttons
        toLeftImage();
        clearInterval(intervalRef.current);
    }

    function rightAndClear() {
        toRightImage();
        clearInterval(intervalRef.current);
    }


    return (
        <>
            <div id="allSlideshows">
                {repeatSpotlightBannerDivs.map((_, number) => (
                    <div key={number} style={{ translate: `${-100 * slideIndex}%` }} className={"slideshow_wraper " + [number]}> {/* using translate to get a animation */}
                        <div className="slide_banner_wrapper">
                            <img src={allMovies.spotlight[number].banner} draggable="false" />
                            <div className="color_to_banner1">
                                <div className="slide_info_inner">
                                    <div className="titel">{allMovies.spotlight[number].title}</div>
                                    <div className="watch_button"><button>Watch now</button><i className='bx bx-play bx-tada' ></i></div>
                                    <div className="review">{allMovies.spotlight[number].rating} <i className='bx bxs-star'></i></div>
                                    <div className="year">{allMovies.spotlight[number].year}</div>
                                </div>
                            </div>
                            <div className="color_to_banner2"></div>
                        </div>

                    </div>
                ))}

                <div id="buttons">
                    <div className="slide_to_left">
                        <button onClick={leftAndClear}><i className='bx bxs-left-arrow-alt'></i></button>
                    </div>
                    <div className="slide_to_right">
                        <button onClick={rightAndClear}><i className='bx bxs-right-arrow-alt' ></i></button>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Info;