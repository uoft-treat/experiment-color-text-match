import React, {useEffect}              from 'react';
import {withRouter}                    from "react-router-dom";
import * as queryString                from "query-string";
import {sessionToken, setSessionToken} from "../storage/TokenStorage";

export const WelcomePage = withRouter(({history, location}) => {

    useEffect(() => {
        const queryVars = queryString.parse(location.search);
        if (!queryVars.sessionId) {
            history.push("/error");
        } else {
            setSessionToken(queryVars.sessionId);
        }
    }, []);

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


