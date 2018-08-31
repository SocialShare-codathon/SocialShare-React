import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Row
} from 'reactstrap';

/* eslint class-methods-use-this: ["error",
{
  "exceptMethods": ["getProfile","handleClick", "postOnWall", "loginLinkedIn", "getLinkedInProfile"]
}] */

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  getProfile(e) {
    e.preventDefault();
    window.location = '/api/get_fb_profile';
  }

  getLinkedInProfile(e) {
    e.preventDefault();
    window.location = '/api/linkedin/info';
  }

  loginLinkedIn(e) {
    e.preventDefault();
    window.location = '/api/linkedin/auth';
  }

  postOnWall(e) {
    e.preventDefault();
    fetch('/api/post_to_fb', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        comment: 'Post testing',
        visibility: {
          code: 'anyone'
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-li-format': 'json'
      }
    })
      .then(res => res.json())
      .then(response => console.log('Success:', response));
  }

  handleClick(e) {
    console.log('Button clicked');
    e.preventDefault();
    window.location = '/api/facebook/auth';
  }

  render() {
    return (
      <div className="container">
        <Form>
          <FormGroup className="m-2">
            <Label for="content">
Input Message
            </Label>
            <Input type="textarea" name="text" id="contentText" rows={5} />
          </FormGroup>
          <Button onClick={this.postOnWall} color="primary" className="float-right">
            Post
          </Button>
        </Form>

        <Row>
          <Button onClick={this.handleClick} color="primary">
            Login with Facebook
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
        </Row>
      </div>
    );
  }
}

export default Home;
