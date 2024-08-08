import React from 'react';
import './App.css';
import WikipediaService from './Services/WikipediaService';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import Home from './Components/Home';

const Header = React.memo(() => {
  return <Container>
    <Row>
      <Col >
        <hr />
        <h1 className="font-weight-lighter text-center" >Welcome to <b style={{ fontFamily: "-moz-initial", fontSize: "1.5em", color: "GrayText" }}>Fast Wiki</b></h1>
        <hr />
      </Col>
    </Row>
  </Container>
})

function App() {
  let wikiService = new WikipediaService();
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/fast-wiki/:title" render={(route) => <Home route={route} WikiService={wikiService} />} />
          <Route path="/" render={(route) => <Home route={route} WikiService={wikiService} />} />
        </Switch>
      </BrowserRouter>
    </div >
  );
}

export default App;
