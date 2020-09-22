import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';

class ProjetModif extends Component {
    render() {
        return (
        <Jumbotron className="bg-dark text-white">
            <h1><FontAwesomeIcon icon={faEdit} /> Modifier un projet</h1>
            <blockquote className= "blockquote mb-0">
                <p>Vous pouvez changer les informations que vous voulez et sauvegarder</p>
            </blockquote>
        </Jumbotron>
        )
    }
}
export default ProjetModif;
