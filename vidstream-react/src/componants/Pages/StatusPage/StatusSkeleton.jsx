import '../../../css/animations.css';
import './StatusSkeleton.css';

function StatusSkeleton() {
    return (
        <>
            <div id="WrapperSkeleton">
                <div className="ActiveSkeleton">
                        <div className="projectMessage">Loading status.</div>
                        <div class="loadingText"></div>
                </div>
            </div>
        </>
    )
}

export default StatusSkeleton;