import React from 'react';



class NotFound extends React.Component {



  render(){
    console.log(this.props.history);

    return (
        <div>
          <h2>404</h2>

        </div>
      );

  }


}



export default NotFound;
