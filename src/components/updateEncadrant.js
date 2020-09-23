import React, { Component } from 'react'
import { Card, Form, Col , Button} from 'react-bootstrap';
import axios from 'axios'
import ToastModif from './Projet/Toasts/ToastModif';

class VoitureUpdate extends Component {
   
    async componentDidMount() 
    {
        const id = this.props.match.params.id;

        const res = await axios.get('http://localhost:9090/Encadrants/'+id);
        
        console.log(res.data.nom)

        this.setState({
            id: id,
            nom : res.data.nom,
            prenom : res.data.prenom,
            role : res.data.role,
            departement : res.data.departement
        });

    }


    state = 
    {
        id:'',
        nom:'',
        prenom:'',
        role:'',
        departement:''
    };

    constructor(props) 
    {
        super(props);
        this.state = { encadrant: this.initialState };
        this.encadrantChange = this.encadrantChange.bind(this);
        this.updateEncadrant = this.updateEncadrant.bind(this)
    }

    encadrantChange(event) 
    {
        this.setState ({ [event.target.name] : event.target.value });
    }

    async updateEncadrant(event) {
        
        event.preventDefault();

        const id = this.props.match.params.id;
        
        const encadrant= {
            id:this.state.id,
            nom:this.state.marque,
            prenom:this.state.modele,
            role:this.state.couleur,
            departement:this.state.prix
        }

        console.log("sss", encadrant.nom);
        await axios.patch("http://localhost:9090/Encadrants/"+id, encadrant)
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

                <Card.Header> Modifier une Voiture </Card.Header>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                <ToastModif children = {{show:this.state.show, message:"Voiture modifiée avec succès.",type:"success"}}/> 
                </div>

                <Form onSubmit={this.updateEncadrant} id="VoitureFormId">

                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridMarque">
                        <Form.Label> Nom </Form.Label>
                        <Form.Control name="marque" autoComplete="off" required type="text"
                        className={"bg-dark text-white"}
                        value = {this.state.marque} onChange = {this.encadrantChange} placeholder= "Nom"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridModele">
                        <Form.Label> Prenom </Form.Label>
                        <Form.Control name="modele" autoComplete="off" required type="text"
                        className={"bg-dark text-white"}
                        value = {this.state.modele} onChange = {this.encadrantChange} placeholder= "Prenom"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCouleur">
                        <Form.Label> Role </Form.Label>
                        <Form.Control name="couleur" autoComplete="off" required type="text"
                        className={"bg-dark text-white"}
                        value = {this.state.couleur} onChange = {this.encadrantChange} placeholder= "Role"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridImmatricule">
                        <Form.Label> departement </Form.Label>
                        <Form.Control name="prix" autoComplete="off" required type="text" className={"bg-dark text-white"}
                        value = {this.state.prix} onChange = {this.encadrantChange} placeholder= "departement"/>
                        </Form.Group>

                    </Form.Row>
                </Card.Body>

                <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant="primary" type="submit"> Update </Button>{' '}
                    <Button size="sm" variant="info" type="reset"> Reset </Button>
                </Card.Footer>
            </Form>
            </Card>
);
}
}
export default  VoitureUpdate;