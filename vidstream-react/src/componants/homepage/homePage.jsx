
import './homePage.css';

import React, { useEffect } from 'react';



function Homepage() {
    // aantal cards preloaded
    const totalItems = 8;
    const items = new Array(totalItems).fill(null);
    const card = "card ";

    // slide function
    // handleMouseMove = (event) => {
    //     console.log('Mouse position:', event.clientX, event.clientY);
        
    //   };

    // useEffect(() => {
    //     window.addEventListener("mousemove", handleMouseMove );
    //     console.log();
    // })

    function handleMouseMove(e) {
        
    }

    return (
        <div className="allCards">
            {items.map((_, idx) => 
            <div className={card + idx}
            onMouseMove={this.handleMouseMove}>
                <div className="banner">
                    <img src="../pics/dummy image.png"/>
                </div>
                <div className="card_info">
                    <div className="titel">titel</div>
                    <div className="review">review</div>
                    <div className="duration">duration</div>
                    <div className="year">year</div>
                </div>
            </div>)}
        </div>
    );
}

export default Homepage;