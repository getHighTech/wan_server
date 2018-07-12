import React from 'react';
import urlencode from 'urlencode';

class WechatChecker extends React.Component {


  isWeChat(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  }
  componentDidMount(){
    if(this.isWeChat())
    {
    }
    // alert(JSON.stringify(this.props));
    let getOpenidCodeUrl = urlencode(window.location.href);


    if(!this.isWeChat()){
      this.props.histroy.push("/")
    }



    if(this.props.match.params.openid===undefined){
      this.props.history.push("/");
      if(this.isWeChat()){

        window.location.assign('http://test2.10000cars.cn/app/getopenid/'+getOpenidCodeUrl);
      }
    }
    if(this.props.match.params.openid){
      // alert(this.props.match.params.openid);
      this.props.history.push("/")
    }

  }


  render(){

    return (
        <div>
          <h2>此处是检查微信并获取openid的地方</h2>

        </div>
      );

  }


}



export default WechatChecker;
