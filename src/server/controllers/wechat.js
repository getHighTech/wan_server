import rp from 'request-promise';
import axios from 'axios';
import sha1  from 'sha1';
import mongoose from 'mongoose';
import WechatShare  from '../models/WechatShare.js';

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
  // let appid = 'wx387b34583841ec2d'; //自己公众号appid
  // let secret = '5e4e086325a72ffd80bf179e6a22749b';
  //
  let appid = 'wx0564668ed5671740'; //公众号appid
  let secret = '02938e071aae51a7b59b7fe6f627a681';

  // let appid = 'wx412cc1c5e02a292e'; //测试公众号appid
  // let secret = '2cd967050582d6256d8108281af8e8eb';
    //获取accessToken
    const {url} = ctx.query;
    console.log(url);
    var timestamp = Date.parse(new Date()).toString().substr(0,10)
    console.log(timestamp);

		var noncestr="";

		var stra="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		for(var i=0;i<16;i++){
			noncestr+=stra.substr(Math.round((Math.random()*10)),1);
		}
    console.log(noncestr);

    var access_token='';
    var ticket='';
    var parameter =new Object();
  const first = await WechatShare.model.find();


  if (first.length>0) {
    var time1 = first[0].createdAt;
    var time2=new Date();
    var time3= time2.getTime()-time1.getTime();
    console.log('时间差为：'+time3/1000);
          if (time3/1000>7000) {
            console.log('如果时间超过7000秒，重新获取');
            const  res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
            access_token= res.data.access_token;
            const result = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`);
            ticket = result.data.ticket
            let id = first[0]._id;
            const refalsh = await WechatShare.model.update({_id:id},{
              $set:{
                access_token:access_token,
                ticket:ticket,
                createdAt:new Date()
              }
            })
          }
          else {
                console.log('此时缓存还存在');
                access_token = first[0].access_token;
                ticket= first[0].ticket;
                console.log('此时的ticket是：'+ticket);
          }
  }else {
    console.log('数据库没有存储');
    const  res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
    access_token= res.data.access_token;
    const result = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`);
    ticket = result.data.ticket
    console.log('生成的ticket'+ticket);
    // const oneData = await WechatShare.model.creat({'ticket': ticket,'access_token':access_token,'aaa':'zsx','createdAt':new Date()})
    WechatShare.InsertShare(access_token,ticket).then(rlt=>{
      console.log(rlt[0]);
    })
  }

  var str ="jsapi_ticket="+ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
  console.log('生成的签名'+str);
  parameter.nonceStr=noncestr;
  parameter.timestamp=timestamp;

  parameter.signature=sha1(str)
  parameter.access_token=access_token;
  ctx.body={
    parameter
  }



}
