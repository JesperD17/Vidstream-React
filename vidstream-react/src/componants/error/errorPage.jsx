import './errorPage.css'

import { Link } from 'react-router-dom';

function error() {

    return (
        <div id="errorWrapper">
            <i class='bx bxs-error-alt' ></i>
            <div className="errorMessage">
                Unable to load data. Please refresh the page, or visit our 
                <Link to="/Status">
                    Status
                </Link>
                 page for more information.
            </div>
        </div>
    )
}

export default error;