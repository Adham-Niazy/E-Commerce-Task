import React from "react";

import './PageNotFound.scss';

const PageNotFound = (props) => {
    return(
        <div className="error-page">
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
        </div>
    );
}

export default PageNotFound;