import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Navigationbar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={"/home"} className="nav-link">Home</Link>
                <Link to={"/projet"} className="nav-link">Projets</Link>
                <Link to={"/encadrant"} className="nav-link">Encadrants</Link>
                <Link to={"/etudiant"} className="nav-link">Etudiants</Link>
                <Link to={"/groupe"} className="nav-link">Groupes</Link>
                <Link to={"/seance"} className="nav-link">Séances d'encadrements</Link>
            </Navbar>
        );
    }
}
export default Navigationbar;