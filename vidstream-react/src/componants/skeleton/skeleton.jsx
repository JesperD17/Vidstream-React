
// import './homePage.css';
import './skeleton.css';

import Drag from '../global functions/draggableItems';

function Skeleton() {

    // number of cards preloaded
    const amountOfCards = 20;
    const totalCards = new Array(amountOfCards).fill(null);

    const amountOfStructures = 4;
    const totalStructures = new Array(amountOfStructures).fill(null);

    // importing drag function
    const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = Drag();

    Drag()
    return (
        <>
        {totalStructures.map((_, structures) => (
            <div className="allSkeleton_Cards"
            key={structures}>
                <div className="Titles_wrapper">
                    <div className="MainTitles"
                    style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                    >Title of mainTitles.</div>
                    <div className="See_all_Links"
                    style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                    >Links of See_all_Links. <i className='bx bx-right-arrow-alt'></i></div>
                </div>
                <div className={"allCards"}
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >
                    {totalCards.map((_, number) => (
                        <div className={"card " + number}
                            key={number}
                            style={{ background: "white" }}>
                            <div className="banner">
                                <img
                                    draggable="false"
                                    style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                                />
                            </div>
                            <div className="card_info"
                                style={{ gap: "10px", display: "flex", flexDirection: "column" }}>
                                <div className="titel"
                                    style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                                >titel {number}</div>

                                <div className="card_info_inner">
                                    <div className="review"
                                        style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                                    >review</div>
                                    <div className="duration"
                                        style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                                    >duration</div>
                                    <div className="year"
                                        style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                                    >year</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        </>
    );
}

export default Skeleton;