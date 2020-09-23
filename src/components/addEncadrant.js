import React, { Component } from 'react';
import { Card, Form, Col , Button} from 'react-bootstrap';
import axios from 'axios'
import ToastAjout from './Projet/Toasts/ToastAjout';

class VoitureAjout extends Component{

    initialState = 
    {
        Nom:' ',
        Prenom:' ',
        Role:' ',
        Departement:' '
    };

    constructor(props) 
    {
        super(props);
        this.state=this.initialState;
        this.encadrantChange = this.encadrantChange.bind(this);
        this.submitEncadrant = this.submitEncadrant.bind(this)
    }

    encadrantChange(event) 
    {
        this.setState ({ [event.target.name] : event.target.value });
    }

    submitEncadrant(event) {
        event.preventDefault();

        const encadrant= {
            
            nom:this.state.Nom,
            prenom:this.state.Prenom,
            role:this.state.Role,
            departement:this.state.Departement
        }

        axios.post("http://localhost:9090/Encadrants", encadrant)
        .then(response => {
            if (response.data != null) 
            {
                this.setState(this.initialState);
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 1000);
                setTimeout(() => this.props.history.push('/Encadrants'), 1000);
            }
        })
        }

    render(){
        return(
            <Card className={"border border-dark bg-dark text-white"}>

                <Card.Header> Ajouter un encadrant </Card.Header>

                <div style={{"display":this.state.show ? "block" : "none"}}>
                <ToastAjout children = {{show:this.state.show, message:"Encadrant ajoutée avec succès.",type:"success"}}/> 
                </div>

                <Form onSubmit={this.submitEncadrant} id="VoitureFormId">

                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridMarque">
                        <Form.Label> Nom </Form.Label>
                        <Form.Control name="Nom" autoComplete="off" required type="text"
                        className={"bg-dark text-white"}
                        value = {this.state.Nom} onChange = {this.encadrantChange} placeholder= "Nom"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridModele">
                        <Form.Label> Prenom </Form.Label>
                        <Form.Control name="Prenom" autoComplete="off" required type="text"
                        className={"bg-dark text-white"}
                        value = {this.state.Prenom} onChange = {this.encadrantChange} placeholder= "Prenom"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCouleur">
                        <Form.Label> Role </Form.Label>
                        <Form.Control name="Role" autoComplete="off" required type="text"
                        className={"bg-dark text-white"}
                        value = {this.state.Role} onChange = {this.encadrantChange} placeholder= "Role"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridImmatricule">
                        <Form.Label> Departement </Form.Label>
                        <Form.Control name="Departement" autoComplete="off" required type="text" className={"bg-dark text-white"}
                        value = {this.state.Departement} onChange = {this.encadrantChange} placeholder= "Departement"/>
                        </Form.Group>

                    </Form.Row>
                </Card.Body>

                <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant="success" type="submit"> Submit </Button>{' '}
                    <Button size="sm" variant="info" type="reset"> Reset </Button>
                </Card.Footer>
            </Form>
            </Card>
);
}
}
export default VoitureAjout;