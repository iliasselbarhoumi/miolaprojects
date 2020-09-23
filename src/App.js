import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home'
import Navigationbar from './components/Navigationbar'
import ProjetList from './components/Projet/ProjetList'
import ProjetModif from './components/Projet/ProjetModif'
import PageNotFound from './components/PageNotFound'
import Toogle from './components/Projet/Toogle';


class App extends Component {
  render()
  {
    const marginTop = { marginTop:"20px"}
    return (
      <Router>
        <Navigationbar/>
          <Container>
            <Row>
              <Col lg={12} style={marginTop}>
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/projet" exact component={ProjetList}/>
                <Route path="/toogle" exact component={Toogle}/>
                <Route path="/projet/modif/:id" exact component={ProjetModif}/>
                <Route  component={PageNotFound}/>
              </Switch>
              </Col>
            </Row>
          </Container>
      </Router>
    );
  }
}
export default App;
