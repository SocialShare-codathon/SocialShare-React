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
/* eslint class-methods-use-this: ["error",
{ "exceptMethods": ["getProfile","handleClick", "postOnWall", "loginLinkedIn", "getLinkedInProfile"] }] */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  getProfile(e) {
    e.preventDefault();
    window.location = '/api/get_fb_profile';
  }

  handleClick(e) {
    console.log('Button clicked');
    e.preventDefault();
    window.location = '/api/facebook/auth';
  }

  postOnWall(e) {
    e.preventDefault();
    fetch('/api/linkedin/post', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({ text: 'How is everyone today?' }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => console.log('Success:', response));
  }

  loginLinkedIn(e) {
    e.preventDefault();
    window.location = '/api/linkedin/auth';
  }

  getLinkedInProfile(e) {
    e.preventDefault();
    window.location = '/api/linkedin/info';
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
          <Button onClick={this.postOnWall} color="primary" size="lg">
            Post
          </Button>
        </Form>
        <Button onClick={this.handleClick} color="primary">
          Login with facebook
        </Button>
        <Button onClick={this.getProfile} color="info">
          Get Facebook profile
        </Button>
        <Button onClick={this.loginLinkedIn} color="primary">
          Login with Linkedin
        </Button>
        <Button onClick={this.getLinkedInProfile} color="info">
          Get Linkedin profile
        </Button>
      </div>
    );
  }
}
