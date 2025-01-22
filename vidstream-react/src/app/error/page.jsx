import './error.css'

import Link from 'next/link';

function error() {

    return (
        <div id="errorWrapper">
            <i className='bx bxs-error-alt' ></i>
            <div className="errorMessage">
                Unable to load data. Please refresh the page, or visit our 
                <Link href="/Status">
                    Status
                </Link>
                 page for more information.
            </div>
        </div>
    )
    
}

export default error;