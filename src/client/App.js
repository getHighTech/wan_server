import React, { Component } from 'react';
import AppRoutes from './routes';

class App extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className="App">
        <AppRoutes />
      </div>
    );
  }
}
export default App;
