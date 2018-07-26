import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Jumbotron, Button } from 'react-bootstrap';


class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      listItems: []
    };
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.newItem.value.trim();
    if (newItem === "") {
      return;
    }
    const newListItems = [...this.state.listItems, newItem];
    this.setState({
      listItems: newListItems.sort()
    });
    console.log(newListItems);
    this.addform.reset();
  }

  render() {
    
    const buttonStyle = {
      color: "black",
      border: "2px solid #008CBA"
    };

    const divStyle ={
      padding: "150px 150px 100px 100px",
    };

    return (
      <div style={divStyle}>
        <h3>SOCIAL SHARE</h3>
        <form
          ref={input => (this.addform = input)}
          onSubmit={e => {
            this.addItem(e);
          }}
        >
          <label className="TextInput">
            Input Text:{" "}
            <input
              name="name"
              ref={input => {
                this.newItem = input;
              }}
              autoFocus
            />
          </label>
          <br />
          <br />
          <button type="submit" className="Submit" style={buttonStyle}>
            Add to list
          </button>
        </form>

        <h2>Items:</h2>
        <ul className="List">>
          {this.state.listItems.map(listItems => {
            return <li> {listItems} </li>;
          })}
        </ul>

      </div>
    );
  }
}

export default App;
