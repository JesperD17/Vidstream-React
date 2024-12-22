
// import './homePage.css';
// import './skeleton.css';

import Drag from '../global functions/draggableItems';

function Skeleton() {

// number of cards preloaded
    const totalItems = 20;
    const items = new Array(totalItems).fill(null);


// importing drag function
const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = Drag();

Drag()
    return (
        <>  
        <link href='./skeleton.css' rel='stylesheet'/>
            <div className={"allCards"}
            ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {
                    items && items.length > 0 ? (
                        items.map((any, number) => (
                            <div className={"card " + number} key={number}>
                                <div className="banner">
                                    <img onerror="display='none'" draggable="false" /> {/* hides the broken image icon */}
                                </div>
                                <div className="card_info">
                                    <div className="titel">titel {number}</div>
                                    <div className="review">review</div>
                                    <div className="duration">duration</div>
                                    <div className="year">year</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-items">
                            <p>No items available.</p>
                        </div>
                    )
                }

            </div>
        </>
    );
}

export default Skeleton;