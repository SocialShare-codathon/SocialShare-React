import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class Profile extends Component {
  render() {
    return (
      // todo: add layout + button similar to web sample
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
              <img src="../profile-pic.png" />
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
Pic
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
Pic
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
    );
  }
}
export default Profile;
