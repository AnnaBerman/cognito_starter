import React, { Component } from "react";
import { Card } from "react-bootstrap";
const API_INVOKE_URL =
  "https://wxy1rnu7al.execute-api.us-east-1.amazonaws.com/prod";

export default class Pet extends Component {
  constructor() {
    super();
    this.state = {
      pet: null,
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API_INVOKE_URL + "/pet/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        if (data) {
          this.setState({
            pet: data[0],
            isLoading: false
          });
        } else {
          this.setState({ pet: null, isLoading: false });
        }
      });
  }
  render() {
    let pet = this.state.isLoading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.state.pet && (
        <Card>
          <Card.Img variant="top" src={this.state.pet.imageURL} />
          <Card.Body>
            <Card.Title>{this.state.pet.name}</Card.Title>
            <Card.Text>{this.state.pet.description}</Card.Text>
          </Card.Body>
        </Card>
      )
    );
    return <div>{this.props.auth.isAuth && this.props.auth.user && pet}</div>;
  }
}
