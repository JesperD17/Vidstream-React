import { useRef, useState } from 'react';

// slide cards function

function useDrag() {

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

    return {
        containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave
    };

}

export default useDrag;
// import:
// import useDrag from '../global functions/draggableItems';


// jsx:
// const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDrag();

// inside parent div:
// ref={containerRef}
// onMouseDown={handleMouseDown}
// onMouseMove={handleMouseMove}
// onMouseUp={handleMouseUpOrLeave}
// onMouseLeave={handleMouseUpOrLeave}
