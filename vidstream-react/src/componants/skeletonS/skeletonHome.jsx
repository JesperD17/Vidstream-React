import SkeletonLoader from './skeletenLoader';
function SkeletonHome() {

    // number of cards preloaded
    const amountOfCards = 20;
    const totalCards = new Array(amountOfCards).fill(null);

    const amountOfStructures = 4;
    const totalStructures = new Array(amountOfStructures).fill(null);
    var loadingStyles = {
        animation: "skeleton-loading 1s linear infinite alternate",
        color: "transparent"
    }
    return (
        <>
            <SkeletonLoader />

            <div className="homeSkeletonWrapper">
                <div id="allSlideshows">
                    <div className="slideshow_wraper">
                        <div className="slide_banner_wrapper">
                            <img draggable="false" style={{ ...loadingStyles }} />
                            <div className="color_to_banner1" style={{ background: "white" }}>
                                <div className="slide_info_inner">
                                    <div
                                        className="titel"
                                        style={{ ...loadingStyles }}
                                    >this is a long title</div>
                                    <div className="watch_button" style={{ ...loadingStyles }}>
                                        <button style={{ color: "transparent" }}>Watch now</button>
                                        <i className='bx bx-play bx-tada' ></i>
                                    </div>
                                    <div className="review" style={{ ...loadingStyles, margin: "10px" }}>review</div>
                                    <div className="year" style={{ ...loadingStyles, margin: "10px", marginTop: "0px" }}>year</div>
                                </div>
                            </div>
                            <div className="color_to_banner2"
                                style={{ background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)" }}>
                            </div>
                        </div>
                    </div>
                    <div id="buttons">
                        <div className="slide_to_left" style={{ background: "white" }}>
                            <button>
                                <i style={{ color: "transparent" }} className='bx bxs-left-arrow-alt'></i>
                            </button>
                        </div>
                        <div className="slide_to_right" style={{ background: "white" }}>
                            <button>
                                <i style={{ color: "transparent" }} className='bx bxs-right-arrow-alt' ></i>
                            </button>
                        </div>
                    </div>
                </div>


                {totalStructures.map((_, structures) => (
                    <div className="allSkeleton_Cards"
                        key={structures}>
                        <div className="Titles_wrapper">
                            <div className="MainTitles"
                                style={{ ...loadingStyles, fontsize: "35px" }}
                            >Most trending movies & series.</div>
                            <div className="See_all_Links"
                                style={{ ...loadingStyles, fontsize: "20px" }}
                            >See all. -=<i className='bx bx-right-arrow-alt'></i></div>
                        </div>
                        <div className={"allCards"}
                        >
                            {totalCards.map((_, number) => (
                                <div className={"card " + number}
                                    key={number}
                                    style={{ background: "white" }}>
                                    <div className="banner">
                                        <img
                                            draggable="false"
                                            style={{ ...loadingStyles }}
                                        />
                                    </div>
                                    <div className="card_info"
                                        style={{ gap: "10px", display: "flex", flexDirection: "column" }}>
                                        <div className="titel"
                                            style={{ ...loadingStyles }}
                                        >titel {number}</div>

                                        <div className="card_info_inner">
                                            <div className="review"
                                                style={{ ...loadingStyles }}
                                            >review</div>
                                            <div className="duration"
                                                style={{ ...loadingStyles }}
                                            >duration</div>
                                            <div className="year"
                                                style={{ ...loadingStyles }}
                                            >year</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SkeletonHome;