import React, {useEffect}                          from 'react';
import {withRouter}                                from "react-router-dom";
import styled                                      from 'styled-components';
import {getFirstHalfCorrect, getSecondHalfCorrect} from "../storage/ResultStorage";
import {sessionToken}                              from "../storage/TokenStorage";
import {request}                                   from "graphql-request";

const SUBMISSION_URL = "https://graphql.treatproject.tk/graphql";

export const Result = withRouter(({history}) => {

    useEffect(() => {
        (async () => {
            await request(SUBMISSION_URL, `
                mutation($experimentSessionId: String!, $jsonData: String!) {
                  createExperimentSessionData(data: {
                    experimentSessionId: $experimentSessionId,
                    jsonData: $jsonData
                  }) {
                    createdAt
                  }
                }
            `, {
                experimentSessionId: sessionToken,
                jsonData: JSON.stringify({
                    firstHalfCorrect: getFirstHalfCorrect(),
                    secondHalfCorrect: getSecondHalfCorrect(),
                })
            });
            console.log("Data submitted...");
        })();
    }, []);

    if (!sessionToken) {
        history.push("/error");
    }

    return (
        <Container>
            <h1>Thank you for participating!</h1>
            <ResultDisplay>
                You got {getFirstHalfCorrect() + getSecondHalfCorrect()} questions correct.
            </ResultDisplay>
            <p>You can safely close this window now.</p>
        </Container>
    );

});


const Container = styled.div`
  text-align: center;
`;


const ResultDisplay = styled.div`
  font-size: 20px;
`;
