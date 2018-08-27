import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';

class Signup extends Component {
  render() {
    return (
      <Form className="container">
        <FormGroup>
          <Label for="exampleEmail">
Email
          </Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">
Password
          </Label>
          <Input type="password" name="password" id="examplePassword" placeholder="New Password" />
        </FormGroup>
        <FormGroup>
          <Label for="retypePassword">
Password
          </Label>
          <Input
            type="password"
            name="retype password"
            id="retypePassword"
            placeholder="Retype Password"
          />
        </FormGroup>
        <Button>
Submit
        </Button>
      </Form>
    );
  }
}

export default Signup;
