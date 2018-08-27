import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// /* eslint class-methods-use-this: ["error",
// {
//   "exceptMethods": ["getProfile","handleClick", "postOnWall", "loginLinkedIn", "getLinkedInProfile"]
// }] */

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      modal: false
    };

    this.postOnWall = this.postOnWall.bind(this);
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
    fetch('/api/linkedin/post', {
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

    this.setState({
      modal: !this.state.modal
    });
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

          <Button color="primary" onClick={this.postOnWall}>
            {this.props.buttonLabel}
            Post
          </Button>

          <Modal
            isOpen={this.state.modal}
            toggle={this.postOnWall}
            className={this.props.className}
          >
            <ModalBody>
Successfully posted!
            </ModalBody>

            <ModalFooter>
              <Button color="success" onClick={this.postOnWall}>
                Ok
              </Button>
            </ModalFooter>
          </Modal>
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
