function StatusSkeleton() {
    return (
        <>
            <div className="ErrorMessage">
                <div className="projectMessage"
                style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                >Lorem ipsum dolor sit amet</div>
                <i className='bx bxs-error'></i>
                <div className="ErrorTextWrapper">
                    <div className="ErrorText"
                    style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                    >Lorem ipsum dolor sit amet, consectetur</div>
                    {/* <div className="ErrorText">There ARE errors seen at the moment</div> */}
                    <div className="ActiveText"
                    style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                    >Lorem ipsum dolor sit amet, con </div>
                    <div className="ActiveText"
                    style={{ animation: "skeleton-loading 1s linear infinite alternate", color: "transparent" }}
                    >Lorem ipsum dolor sit amet, consectetur</div>
                </div>
            </div>
        </>
    )
}

export default StatusSkeleton;