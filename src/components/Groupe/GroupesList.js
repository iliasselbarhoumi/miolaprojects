import React, { Component } from "react";
import { ButtonGroup, Button, Card, Table ,Form, Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash,faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ToastSupp from "../Toasts/ToastSupp";
import { Link } from "react-router-dom";
import {Jumbotron} from 'react-bootstrap';
import ToastAjout from '../Toasts/ToastAjout';
import NavigationBar from '../Navigationbar';


class GroupesList extends Component {

  initialState = 
    {
        Nom:' '
    };

  constructor(props) {
    super(props);
    this.state = { Groupes: [] , isToggleOn: false};

    this.groupeChange = this.groupeChange.bind(this);
    this.ajoutGroupe = this.ajoutGroupe.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:9090/groupes")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ Groupes: responseData });
      })
      .catch((err) => console.error(err));
  }

  deleteGroupe = (groupeId) => {
    axios
      .delete("http://localhost:9090/groupes/" + groupeId)
      .then((response) => {
        if (response.data != null) 
        {
          this.setState({ showSuppToast: true });
          setTimeout(() => this.setState({ showSuppToast: false }), 1000);
          this.setState({ Groupes: this.state.Groupes.filter((groupe) => groupe.id !== groupeId)});
        } 
        else { this.setState({ showSuppToast: false }); }
      });
  };

  ajoutGroupe(event) {
    event.preventDefault();

    const groupe= {
        nom:this.state.nom
    }

    axios.post("http://localhost:9090/groupes", groupe)
    .then(response => {
        if (response.data != null) 
        {
            this.setState(this.initialState);
            this.setState({"showAddToast":true});
            setTimeout(() => this.setState({"showAddToast":false}), 1000);
            setTimeout(() =>  window.location.reload(false), 1000);
        }
    })
    }
  

  handleClick() {
    this.setState(state => ({
      isToggleOn: !this.state.isToggleOn
    }));        
  }

  groupeChange(event) { this.setState ({ [event.target.name] : event.target.value }); }


  render () {
    return (

        <div>

            <NavigationBar/>
                <br/>
                
            <Jumbotron className="bg-dark text-white">

                {/*  Titre + Button d'ajout d'un nouveau groupe */}

                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <h1><FontAwesomeIcon icon={faList} /> Liste des groupes</h1>
                            <blockquote className= "blockquote mb-0">
                                <p>Vous trouverez la liste des groupes existants</p>
                            </blockquote>
                        </div>
                        <div className="col-sm-4">
                        <Button size="lg" variant="outline-success" onClick={this.handleClick}> <FontAwesomeIcon icon={faPlus} /> Ajouter un groupe</Button> 
                        </div>
                    </div>
                </div>

                {/*  Toast Suppression */}

                <div style={{"display":this.state.showSuppToast ? "block" : "none"}}>
                    <ToastSupp children = {{showSuppToast:this.state.showSuppToast, message:"Groupe supprimé",type:"danger"}}/> 
                </div>

                {/*  Formulaire d'ajout d'un nouveau groupe */}

                    <div className="FormAjout" style={{"display":this.state.isToggleOn ? "block" : "none"}}>

                    <Card className={"border border-dark bg-dark text-white"}>

                        <Card.Header> Ajouter un groupe </Card.Header>

                        <div style={{"display":this.state.showAddToast ? "block" : "none"}}>
                        <ToastAjout children = {{showAddToast:this.state.showAddToast, message:"Groupe ajouté avec succès.",type:"success"}}/> 
                        </div>

                        <Form onSubmit={this.ajoutGroupe} id="GroupeFormId">

                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNom">
                                <Form.Label> Nom </Form.Label>
                                <Form.Control name="nom" autoComplete="off" required type="text"
                                className={"bg-dark text-white"}
                                value = {this.state.nom} onChange = {this.groupeChange} placeholder= "Entrez Nom Groupe"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>

                        <Card.Footer style={{"textAlign":"center"}}>
                            <Button size="lm" variant="success" type="submit"> Ajouter </Button>
                        </Card.Footer>
                        </Form>
                        </Card>

                    </div>


                {/*  Liste des encadrants existants dans la base de données */}

                <Card className={"border border-dark bg-dark text-white"}> 
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead> 
                                <tr><th>Nom</th></tr>
                            </thead>

                            <tbody>

                            { 
                                /* If there is no encadrant, show "Aucun encadrant existant" */
                                this.state.Groupes.length ===0 ? <tr align="center"><td colSpan="6">Aucun groupe existant.</td></tr> :
                                
                                /* else, we should fetch the data from the API */
                                this.state.Groupes.map((groupe) => ( 
                                <tr key={groupe.id}>
                                    <td>{groupe.nom}</td>
                                    <td>
                                            <ButtonGroup>
                                            <Link to={{ pathname: `/groupe/ajoutetudiant/${groupe.id}`}} className="nav-link">
                                                <Button size="sm" variant="outline-success"><FontAwesomeIcon icon={faUserPlus}/> </Button>
                                            </Link>
                                            <Link to={{ pathname: `/groupe/modif/${groupe.id}`}} className="nav-link">
                                                <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}/> </Button>
                                            </Link>
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteGroupe.bind(this,groupe.id)}> <FontAwesomeIcon icon={faTrash} /> </Button> 
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
        </div>
    
    )}
}
export default GroupesList;
