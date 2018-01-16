import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class UserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        email: '',
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    }, () => console.log(this.state.user))
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextField
              value={this.state.username}
              name="username"
              floatingLabelText="Username"
              onChange={this.handleChange}
            />
            <TextField
              value={this.state.email}
              name="email"
              floatingLabelText="Email"
              onChange={this.handleChange}
            />
          </div>
          <RaisedButton type="submit" label="Submit" primary />
        </form>
      </Card>
    )
  }
}