import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home'
import Navigationbar from './components/Navigationbar'
import ProjetList from './components/Projet/ProjetList'
import ProjetModif from './components/Projet/ProjetModif'
import EncadrantsList from './components/Encadrant/EncadrantsList';
import updateEncadrant from './components/Encadrant/updateEncadrant';
import PageNotFound from './components/PageNotFound'



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
                
                <Route path="/encadrant" exact component={EncadrantsList}/>
                <Route path="/encadrant/modif/:id" exact component={updateEncadrant}/>
                s
                <Route path="/projet" exact component={ProjetList}/>
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
