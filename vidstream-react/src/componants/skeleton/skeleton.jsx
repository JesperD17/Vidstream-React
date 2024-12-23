
// import './homePage.css';
import './skeleton.css';

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
            <div className={"allCards"}
            ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {items.map((any, number) => (
                    <div className={"card " + number} 
                    key={number}
                    style={{background: "white"}}
                    >
                        <div className="banner">
                            <img 
                                onerror="display='none'" 
                                draggable="false"
                                style={{
                                    animation: "skeleton-loading 1s linear infinite alternate",
                                    color: "transparent"
                                }}
                            /> 
                        </div>
                        <div className="card_info"
                        style={{
                            gap: "10px",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <div className="titel"
                            style={{
                                animation: "skeleton-loading 1s linear infinite alternate",
                                color: "transparent"
                            }}
                            >titel {number}</div>
                            <div className="review"
                            style={{
                                animation: "skeleton-loading 1s linear infinite alternate",
                                color: "transparent"
                            }}
                            >review</div>
                            <div className="duration"
                            style={{
                                animation: "skeleton-loading 1s linear infinite alternate",
                                color: "transparent"
                            }}
                            >duration</div>
                            <div className="year"
                            style={{
                                animation: "skeleton-loading 1s linear infinite alternate",
                                color: "transparent"
                            }}
                            >year</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Skeleton;