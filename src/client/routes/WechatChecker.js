import React from 'react';
import urlencode from 'urlencode';
import {setStore} from '../actions/localStore.js'

class WechatChecker extends React.Component {


  isWeChat(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  }
  componentDidMount(){
    console.log(this.props);
    // alert(JSON.stringify(this.props));
    let getOpenidCodeUrl = urlencode(window.location.href);


    if(!this.isWeChat()){
      this.props.history.push("/")
    }



    if(this.props.match.params.openid===undefined){
      this.props.history.push("/");
      if(this.isWeChat()){

        window.location.assign('http://test2.10000cars.cn/app/getopenid/'+getOpenidCodeUrl);
      }
    }
    if(this.props.match.params.openid){
      setStore("openid", this.props.match.params.openid);
      this.props.history.push(getStore("pathBeforeLogin"));
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
