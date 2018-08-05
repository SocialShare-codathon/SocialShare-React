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

  handleClick(e) {
    console.log("Button clicked");
    e.preventDefault()
    window.location = "/api/facebook/auth";
  }

  getProfile(e) {
    e.preventDefault();
    window.location = "/api/get_fb_profile";
  }
  componentDidMount() {
    
    // const msg = loginTab('/api/facebook/auth');
    // msg.then(out => console.log(out));


    // fetch('/api/facebook/auth', { method: 'GET', redirect: 'manual'}).then((res) => {
    //   console.log(res);
    //   fetch('/api/get_fb_profile').then((res) =>{console.log(res)})
    // });
    // .then((json) => {
    //   console.log(json);
    //   // if(json.success) {
    //   // fetch('/api/facebook/callback?url=' + json.url).then((res) => {
    //   //   console.log(res.json());
    //   // });}
    //   }


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
        <button onClick={this.handleClick}>
Login with facebook</button>
<button onClick={this.getProfile}>
Get Facebook profile</button>
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
