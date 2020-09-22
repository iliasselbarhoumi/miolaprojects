import React from 'react';
import {Jumbotron} from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Bienvenue dans le projet MiolaProjects</h1>
                <blockquote className= "blockquote mb-0">
                    <p>Gérer les projets de vos étudiants de A-Z</p>
                    <footer className="blockquote-footer">Master MIOLA</footer>
                </blockquote>
            </Jumbotron>
        );
    }
}
export default Home;