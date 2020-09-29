import React, { Component } from 'react'
import { Card, Form, Col , Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';
import Select from 'react-select'
import axios from 'axios'
import NavigationBar from '../Navigationbar';


class addEtudiantGroupe extends Component {

    componentDidMount() {
        fetch("http://localhost:9090/etudiants")
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ Etudiants: responseData });
          })
          .catch((err) => console.error(err));

          this.state.Etudiants.map((etudiant) => ( 
            this.state.ListEtudiants.label = etudiant.nom +" "+ etudiant.prenom,
            this.state.ListEtudiants.value = etudiant.id
          ))
      }

      constructor(props) {
        super(props);
        this.state = { Etudiants: [] , ListEtudiants: null};
      }

      ajoutEtudiantGroupe(event) {
        event.preventDefault();
        
        }

        handleChange = selectedEtudiants => {
            this.setState(
              { selectedEtudiants },
              () => console.log(`Option selected:`, this.state.selectedEtudiants)
            );
          };


    render() {
        return (
          <div>
 <      NavigationBar/>
             <br/>
        <Jumbotron className="bg-dark text-white">
                <h1><FontAwesomeIcon icon={faUserPlus} /> Ajouter des étudiants à ce groupe</h1>
                <blockquote className= "blockquote mb-0">
                    <p>Vous pouvez choisir les étudiants que vous voulez pour les ajouter à ce groupe</p>
                </blockquote>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Form onSubmit={this.ajoutEtudiantGroupe} id="GroupeFormId">
                        Selected Values : {JSON.stringify(this.state.value)}
                        <Card.Body>
                            <Select
                                options={this.state.ListEtudiants}
                                onChange={this.handleChange}
                                value={this.state.selectedEtudiants}
                                className="mb-3"
                                placeholder="Choisissez l'étudiant pour l'ajouter"
                                autoFocus isSearchable
                                displayValue="prenom"
                                />
                        </Card.Body>

                        <Card.Footer style={{"textAlign":"center"}}>
                            <Button size="lm" variant="success" type="submit"> Valider </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Jumbotron>
          </div>
            
        )
    }
}
export default addEtudiantGroupe;