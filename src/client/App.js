import React, { Component } from 'react';
import AppRoutes from './routes';
import { signToken, getToken } from './actions/sign_token';

class App extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
    console.log(getToken());
    
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
