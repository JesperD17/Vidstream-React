function SkeletonCards() {
    // cards preloaded
    const amountOfCards = 40;
    const totalCards = new Array(amountOfCards).fill(null);

    return (
        <>
            <div id="Searched" style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}>Searched for:
                <div className="SearchWord" style={{ color: "transparent" }}>Congrats you've found an easteregg!</div>
            </div>
            <div className="allCards" id="searchCards">
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
        </>
    )
}

export default SkeletonCards