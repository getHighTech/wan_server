import React from 'react';

class WechatChecker extends React.Component {


  isWeChat(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  }
  componentDidMount(){
    if(this.isWeChat())
    {
    }
    let getOpenidCodeUrl = window.localhost.href;

    alert(getOpenidCodeUrl);

    if(!this.isWeChat()){
      this.props.history.push("/")
    }



    if(this.props.match.params.openid===undefined){
      this.props.history.push("/");
      if(this.isWeChat()){

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
