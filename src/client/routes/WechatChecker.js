import React from 'react';
import urlencode from 'urlencode';

class WechatChecker extends React.Component {


  isWeChat(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  }
  componentDidMount(){
    alert("微信检查");
    if(isWeChat())
    {
      alert("这是微信端");
    }

    if(!this.isWeChat()){
      this.props.history.push("/")
    }

    alert(this.match.params.openid.toString());

    if(!this.match.params.openid){
      this.props.history.push("/");
      if(this.isWeChat()){
        let getOpenidCodeUrl = urlencode(window.localhost.href);
        window.location.assign('http://test2.10000cars.cn/app/getopenid/'+getOpenidCodeUrl);
      }
    }
    if(this.match.params.openid){
      alert(this.match.params.openid);
      return false;
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
