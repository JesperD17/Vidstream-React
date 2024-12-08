
import React, { forwardRef, useRef, useState } from 'react';

    // slide cards function
const SlideCards = forwardRef(function MyInput(props, ref) { 

    export const containerRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false); // when holding mouse or letting go makes the images follow or not.
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // e = on action, example when handleMouseDown is triggered 'e' is read.
    export const handleMouseDown = (e) => {
        console.log(e);
        const container = containerRef.current; // grabs the current activated div.
        setIsDragging(true); // sticks to mouse.
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
    };

    export const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const container = containerRef.current;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    };

    export const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

}, [])


// import items in file:
// import { handleMouseDown, handleMouseMove, handleMouseUpOrLeave, containerRef } from '../global functions/draggableItems';

// html items:
// <div className={"allCards"}
// ref={containerRef}
// onMouseDown={handleMouseDown}
// onMouseMove={handleMouseMove}
// onMouseUp={handleMouseUpOrLeave}
// onMouseLeave={handleMouseUpOrLeave}
// ></div>
