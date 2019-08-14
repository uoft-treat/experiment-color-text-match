import React                from 'react';
import {Route, Switch}      from "react-router-dom";
import {WelcomePage}        from "./pages/WelcomePage";
import {Experiment}         from "./pages/Experiment";
import styled               from 'styled-components';
import {Result}             from "./pages/Result";
import {Error as ErrorPage} from './pages/Error';

function App() {
    return (
        <Container>
            <Switch>
                <Route exact path="/" component={WelcomePage}/>
                <Route exact path="/experiment" component={Experiment}/>
                <Route exact path="/results" component={Result}/>
                <Route exact path="/error" component={ErrorPage}/>
            </Switch>
        </Container>
    );
}

const Container = styled.div`
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export default App;
