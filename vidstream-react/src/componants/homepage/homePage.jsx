
import './homePage.css';

import React, { useRef, useState } from 'react';

import useSWR from "swr";

// import Swr from '../api/api';
function Homepage() {            
    
    // Loads Api
    const Swr = () => {
        const fetcher = (...args) => fetch(...args).then((res) => res.json());
        const {
            data: allMovies,
            error,
            isValidating,
        } = useSWR('https://vidstream-api.vercel.app/home', fetcher);
        console.log(allMovies)
    }
    
    Swr()      

            
// number of cards preloaded
    const totalItems = 20;
    const items = new Array(totalItems).fill(null);

// slide cards function
    const containerRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false); // when holding mouse or letting go makes the images follow or not.
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // e = on action, example when handleMouseDown is triggered 'e' is read.
    const handleMouseDown = (e) => {
        console.log(e);
        const container = containerRef.current; // grabs the current activated div.
        setIsDragging(true); // sticks to mouse.
        setStartX(e.pageX - container.offsetLeft); 
        setScrollLeft(container.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const container = containerRef.current;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    
    // console.log(allMovies); 
    return (
        
        <div className={"allCards"}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave} 
        onMouseLeave={handleMouseUpOrLeave}
        >

            

            {items.map((any, number) => // 'any' is used when 'totalItems' = null.
            <div className={"card " + number } key={number}>
                <div className="banner">
                    <img src="../pics/dummy image.png" draggable="false" />
                </div>
                <div className="card_info">
                    <div className="titel">titel {number}</div>
                    <div className="review">review</div>
                    <div className="duration">duration</div>
                    <div className="year">year</div>
                </div>
            </div>
            )}

        </div>
    );
}

export default Homepage;