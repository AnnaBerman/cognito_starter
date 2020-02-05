import React, { Component } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
const API_INVOKE_URL =
  "https://wxy1rnu7al.execute-api.us-east-1.amazonaws.com/prod";

export default class Pets extends Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API_INVOKE_URL + "/pet")
      .then(response => response.json())
      .then(data => {
        if (data) {
          this.setState({
            pets: data,
            isLoading: false
          });
        } else {
          this.setState({ pets: [], isLoading: false });
        }
      });
  }
  renderPetsTable() {
    return (
      <Container>
        <h1>Pets</h1>
        <Row>
          {this.state.pets.map(pet => (
            <Col key={pet.id} xs={6} md={4}>
              <a href={`/pet/${pet.id}`}>
                <Image src={pet.imageURL} alt={pet.name} thumbnail />
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
  render() {
    let pets = this.state.isLoading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.state.pets.length > 0 && this.renderPetsTable()
    );
    return <div>{this.props.auth.isAuth && this.props.auth.user && pets}</div>;
  }
}
