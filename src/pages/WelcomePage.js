import React        from 'react';
import {withRouter} from "react-router-dom";

export const WelcomePage = withRouter(({history}) => {

    return (
        <div>
            <p>
                In this experiment, you will be presented a list of text blocks, please choose the one such that the
                text colour matches the word.
            </p>
            <button onClick={() => history.push("/experiment")}>Begin</button>
        </div>
    );

});


