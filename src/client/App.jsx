import React, {Component, Fragment} from 'react';
import Sidebar from './Sidebar.jsx';
import { Header, Footer } from './layouts';
import Main from './main';

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
      <Fragment>
        <Header />

        <Main />
        
        <Footer />
      </Fragment>
    )
  }

}

export default App;