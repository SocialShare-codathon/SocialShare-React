import React, { Component } from 'react';
import './app.css';
import {
  Jumbotron,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    fetch('/api/facebook/auth').then((res) => {
      console.log(res.json);
      res.json();
    });
    // .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1>
            {' '}
Hello Ashika! Good Morning! Have a Great day!
          </h1>
        </Jumbotron>

        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            {' '}
Social Share
            {' '}
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">
Sign In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">
Login
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        <Form>
          <FormGroup>
            <Label for="content">
Text Area
            </Label>
            <Input type="textarea" name="text" id="contentText" rows={5} />
          </FormGroup>
          <Button>
Post
          </Button>
        </Form>
      </div>
    );
  }
}
