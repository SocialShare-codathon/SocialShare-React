import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import {
  Jumbotron, Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Profile from './components/profile';

const Navigation = () => (
  <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand>
        <Link to="/">
          {' '}
Social Share
          {' '}
        </Link>
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink>
            <Link to="/signup">
Sign Up
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/login">
Login
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link to="/profile">
My Profile
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);
class App extends Component {
  render() {
    return (
      <div className="container">
        <Navigation />
        <Profile />
      </div>
    );
  }
}

export default App;
