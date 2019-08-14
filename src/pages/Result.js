import React                                       from 'react';
import {withRouter}                                from "react-router-dom";
import styled                                      from 'styled-components';
import {getFirstHalfCorrect, getSecondHalfCorrect} from "../storage/ResultStorage";

export const Result = withRouter(({history}) => {

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
