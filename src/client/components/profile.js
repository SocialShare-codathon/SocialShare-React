import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class Profile extends Component {
  render() {
    return (
      // todo: add layout + button similar to web sample
      <div>
        <Button color="primary">
Add Facebook Account
        </Button>
        {' '}
        <Button color="success">
Add Linkedin Account
        </Button>
        {' '}
        <Button color="info">
Add Twitter Account
        </Button>
        {' '}
        <Table>
          <thead>
            <tr>
              <th>
Profile Pic
              </th>
              <th>
Account
                {' '}
              </th>
              <th>
Username
              </th>
              <th>
Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <img src="images/fb-logo.png" alt="facebook" />
              </th>
              <td>
Facebook
              </td>
              <td>
Username
              </td>
              <td>
                <Button color="danger">
Remove Account
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <img src="images/linkedin-logo.png" alt="linkedin" />
              </th>
              <td>
Linkedin
              </td>
              <td>
Username
              </td>
              <td>
                <Button color="danger">
Remove Account
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <img src="images/twitter-logo.png" alt="twitter" />
              </th>
              <td>
Twitter
              </td>
              <td>
Username
              </td>
              <td>
                <Button color="danger">
Remove Account
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Profile;
