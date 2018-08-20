import rp from 'request-promise'
export  const wechatAuth = async(ctx) => {
  try{
    let code = ctx.query.code;
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