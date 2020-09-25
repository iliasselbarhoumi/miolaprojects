import React, { Component } from "react";
import { ButtonGroup, Button, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ToastSupp from "./Projet/Toasts/ToastSupp";
import { Link } from "react-router-dom";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = { Encadrants: [] };
  }

  componentDidMount() {
    fetch("http://localhost:9090/Encadrants")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ Encadrants: responseData });
        console.log("ssss", responseData);
      })
      .catch((err) => console.error(err));
  }

  deleteEncadrant = (encadrantId) => {
    axios
      .delete("http://localhost:9090/Encadrants/" + encadrantId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 1000);
          this.setState({
            Encadrants: this.state.Encadrants.filter(
              (encadrant) => encadrant.id !== encadrantId
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };

  updateEncadrant = (encadrant) => {
    axios
      .patch("http://localhost:9090/Encadrants/" + encadrant.id, encadrant)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 1000);
          this.setState({
            Encadrants: this.state.Encadrants.filter(
              (encadrantN) => encadrantN.id !== encadrant.id
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
    this.props.history.push("/Encadrants");
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <ToastSupp
            children={{
              show: this.state.show,
              message: "Encadrant supprimée avec succès.",
              type: "danger",
            }}
          />
        </div>

        <Fab color="primary" aria-label="add">
          <AddIcon>
            <Link to={"/add"} className="nav-link"></Link>
          </AddIcon>
        </Fab>

        <Card className={"border border-dark bg-dark text-white"}>
          {" "}
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Liste des Encadrants
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Role</th>
                  <th>Departement</th>
                </tr>
              </thead>

              <tbody>
                {this.state.Encadrants.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">Aucune encadrant disponible.</td>
                  </tr>
                ) : (
                  this.state.Encadrants.map((encadrant) => (
                    <tr key={encadrant.id}>
                      <td>{encadrant.nom}</td>
                      <td>{encadrant.prenom}</td>
                      <td>{encadrant.role}</td>
                      <td>{encadrant.departement}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={{
                              pathname: `/update/Encadrants/${encadrant.id}`,
                            }}
                            className="nav-link"
                          >
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={this.updateEncadrant.bind(
                                this,
                                encadrant
                              )}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteEncadrant.bind(
                              this,
                              encadrant.id
                            )}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrash} />{" "}
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default CarList;
