import React, {Component, Fragment} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import { NavBar } from './layouts'
import Main from './main'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "testUser"},
      favourite: [],
      playlist: []
    };
  }

  render() {
    return (
        <NavBar>
          <Main />
        </NavBar>
    )
  }

}

export default App;