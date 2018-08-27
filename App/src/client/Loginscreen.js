import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';

class Loginscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginscreen: [],
      loginmessage: '',
      buttonLabel: 'Register',
      isLogin: true
    };
  }

  componentWillMount() {
    const loginscreen = [];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext} />);
    const loginmessage = 'Not registered yet, Register Now';
    this.setState({
      loginscreen,
      loginmessage
    });
  }

  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <MuiThemeProvider>
            <div>
              <RaisedButton
                label={this.state.buttonLabel}
                primary
                style={style}
                onClick={event => this.handleClick(event)}
              />
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Loginscreen;
