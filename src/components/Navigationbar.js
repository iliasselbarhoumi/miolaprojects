import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Navigationbar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={"/"} className="nav-link">Home</Link>
                <Link to={"/projet"} className="nav-link">Projets</Link>
                <Link to={"/toogle"} className="nav-link">Toogle</Link>
                <Link to={""} className="nav-link">Encadrants</Link>
                <Link to={""} className="nav-link">Séances d'encadrements</Link>
            </Navbar>
        );
    }
}
export default Navigationbar;