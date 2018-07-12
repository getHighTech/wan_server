import React from 'react';



class NotFound extends React.Component {


  // isWeChat(){
  //   var ua = navigator.userAgent.toLowerCase();
  //   return ua.match(/MicroMessenger/i) == "micromessenger";
  // }
  // componentDidMount(){
  //   console.log(this.props);
  //   if(!this.isWeChat()){
  //     this.props.history.push("/")
  //   }
  // }
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
