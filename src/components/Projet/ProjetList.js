import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ToastSupp from './Toasts/ToastSupp';
import axios from 'axios';

class ProjetList extends Component {

    constructor(props) 
    {
        super(props);
        this.state = { projets: [] };
    }

    componentDidMount() 
    {
        fetch('http://localhost:9000/projets')
        .then((response) => response.json())
        .then((responseData) =>  {this.setState({ projets: responseData});})
        .catch(err => console.error(err));
    }


    ProjetSupp = (projetId) => { 
        axios.delete("http://localhost:9000/projets/"+projetId).then(response => 
        {
            if(response.data != null)
            {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 1000);
                this.setState({ projets:this.state.projets.filter(projet => projet.id !== projetId) });
            }
            else {this.setState({"show":false});}
        });  
    };
    



//******************    View    *******************/

    render() {
        return (
    <Jumbotron className="bg-dark text-white">
        <h1><FontAwesomeIcon icon={faList} /> Liste des projets</h1>
        <blockquote className= "blockquote mb-0">
            <p>Vous trouverez la liste des projets existants</p>
        </blockquote>

        <div style={{"display":this.state.show ? "block" : "none"}}>
            <ToastSupp children = {{show:this.state.show, message:"Projet supprimé",type:"success"}}/> 
        </div>

        <Card className={"border border-dark bg-dark text-white"}> 
            <Card.Body>
                <Table bordered hover striped variant="dark">
                    <thead> 
                        <tr><th>Titre</th><th>Description</th><th>Durée</th><th>Thème</th><th>Technologies</th></tr>
                    </thead>

                    <tbody>

                    { 
                        /* If there is no project, show "Aucun projet existant" */
                        this.state.projets.length ===0 ? <tr align="center"><td colSpan="6">Aucun projet existant.</td></tr> :
                        
                        /* else, we should fetch the data from the API */
                        this.state.projets.map((projet) => ( 
                            <tr key={projet.id}>
                                <td>{projet.titre}</td>
                                <td>{projet.description}</td>
                                <td>{projet.duree}</td>
                                <td>{projet.theme}</td>
                                <td>{projet.technologies}</td>
                                <td>
                                    <ButtonGroup>
                                    <Link to={"/projet/modif"} className="nav-link">
                                        <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}/> </Button>
                                    </Link>
                                    <Button size="sm" variant="outline-danger" onClick={this.ProjetSupp.bind(this,projet.id)}> <FontAwesomeIcon icon={faTrash} /> </Button> 
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody> 
                </Table>
            </Card.Body>
        </Card>
    </Jumbotron>
        )
    }
}

export default ProjetList;