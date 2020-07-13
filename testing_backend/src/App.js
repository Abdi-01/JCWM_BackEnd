import React from 'react';
import { Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Homepage from './pages/homepage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <Navbar/>
        <Route path="/" component={Homepage} exact />
      </div>
    );
  }
}

export default App;