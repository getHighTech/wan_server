import rp from 'request-promise';
import axios from 'axios';
import sha1  from 'sha1'


export  const wechatAuth = async(ctx) => {
  try{
    let code = ctx.query.code;
    console.log(code);
    let appid = 'wx0564668ed5671740'; //公众号appid
    let secret = '02938e071aae51a7b59b7fe6f627a681';
    let fetchWechatUserInfo = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code `;
    let options = {
        method: 'GET',
        uri: fetchWechatUserInfo,
        json: true
    }
    let userInfo = await rp(options);
    console.log(userInfo)
    if(userInfo.errcode){
        throw new Error('fetch userInfo failure, please check the params')
    }
    let {openid, access_token, refresh_token} = userInfo


    let fetchWechatUserDetailInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN `;
    let userDetailInfo = await rp({method:'GET', uri: fetchWechatUserDetailInfoUrl, json:true })
    userInfo = Object.assign({}, userInfo, userDetailInfo)
    console.log(userInfo)
    ctx.body = {
        userInfo
    }
  }
  catch (err){
    ctx.body = {
        msg: 'fail'
    }
  }
}

export const wechatShare = async(ctx) =>{
  let appid = 'wx387b34583841ec2d'; //公众号appid
  let secret = '5e4e086325a72ffd80bf179e6a22749b';
    //获取accessToken
    const {url} = ctx.query;
    console.log(url);
    var timestamp = Date.parse(new Date()).toString().substr(0,10)
    console.log(timestamp);

		var nonceStr="";

		var stra="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		for(var i=0;i<16;i++){
			nonceStr+=stra.substr(Math.round((Math.random()*10)),1);
		}
    console.log(nonceStr);
  let res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
  let token =res.data
  let access_token = token.access_token;
  let result = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`);
  console.log(result.data);
  var str =  "jsapi_ticket="+result.data.ticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+url;
  console.log(str);
  // var signature = SHA1(str)
  let ticket= result.data;
  ticket.timestamp=timestamp;
  ticket.nonceStr=nonceStr;
  ticket.signature=sha1(str)
  ctx.body={
    ticket
  }



}
