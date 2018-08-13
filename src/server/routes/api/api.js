import Router from 'koa-router';
import Order from '../../models/Order.js';
import Shop from '../../models/Shop.js';
import Products from '../../models/Products.js'
import BalanceIncome from '../../models/BalanceIncome.js';
import Balance from '../../models/Balance.js';
import BalanceCharge from '../../models/BalanceCharge.js';
import BankCard from '../../models/BankCard.js'
import Agency from '../../models/Agency.js';
import User from '../../models/User.js';
// import User from '../../models/User.js'
import rp from 'request-promise'
import moment from "moment"
const  ApiRoute = new Router();
ApiRoute.get('/api/info', async (ctx) => {
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
})

ApiRoute.get('/api/order/status', async ( ctx )=>{
//这是临时的借口
console.log(`11111`)
    try{
        const {userId, status } = ctx.query
        console.log(userId)
        console.log(status)
        const order = await Order.model.find({userId,status}).skip(0).limit(10).sort({createdAt: -1})
        ctx.body = {
            order,
        }
    } catch (err) {
        ctx.body = {
            msg: 'fail'
        }
    }
})


ApiRoute.get('/api/products', async ( ctx )=>{
        try{
        const {shopId,page,pagesize } = ctx.query
        console.log(page,pagesize);
        console.log(shopId);
        let newpage = page-1;
        const products = await Products.find({shopId}).limit(4).skip(newpage).sort({createdAt: -1})
        const shop = await Shop.model.findOne({'_id':shopId})
        ctx.body = {
        products,shop
        }
        } catch (err) {
        ctx.body = {
            msg: 'it is wrong'
        }
        }
})

ApiRoute.get('/api/my/bankcards', async ( ctx )=>{
        try{
            const {bankId } = ctx.query
            const bankcards = await BankCard.model.find({userId:bankId})

            ctx.body = {
            bankcards
            }
            } catch (err) {
            ctx.body = {
              msg: 'fail1111'
            }
          }

})

ApiRoute.get('/api/selling_product', async ( ctx )=>{
        try{
            const {shopId } = ctx.query
            console.log('71``````````````````````'+shopId);
            if (!shopId) {
              console.log('1111');
              const products =[]
              ctx.body = {
              products
              }
            }
            else {
              console.log('2222');
              const products = await Product.model.find({shopId})
              ctx.body = {
              products
              }
            }

            } catch (err) {
            ctx.body = {
              msg: 'fail1111'
            }
          }

})

ApiRoute.get('/api/shop', async ( ctx )=>{
    const {userId, unit, rangeLength  } = ctx.query
    let yestoday = moment().subtract(rangeLength, unit);
    yestoday = yestoday.toISOString();
    let yestodayInData = new Date(yestoday);
    let incomes = await  BalanceIncome.model.find({createdAt: {'$gte':yestodayInData,'$lt':new Date()}, userId});
    let totalAmount = 0;
    for(let i =0; i<incomes.length; i++)
    {
        totalAmount+=income.amount
    }
    ctx.body = {
            incomes,
            totalAmount,
            unit
    }
})


ApiRoute.get('/api/loadMoney', async ( ctx )=>{
    const {userId} = ctx.query
    // console.log(`${userId}`)
    let balance = await Balance.model.findOne({userId});
    let balance_incomes = await BalanceIncome.model.find({userId}).skip(0).limit(10).sort({createdAt: -1})
    let balance_charges = await BalanceCharge.find({userId}).skip(0).limit(10).sort({createdAt: -1})
    let agencies = [];
    let users = [];
    console.log(`来了`)
    // //数据结构兼容，之后可以删除
    let incomeNeedToUpdate = false;
    for(let i=0;i<balance_incomes.length;i++) {
        if(!balance_incomes[i].balanceId){
            await BalanceIncome.model.where({_id: balance_incomes[i]._id }).update({
                balanceId: balance._id
            })
            incomeNeedToUpdate = true;
        }

        if(balance_incomes[i].userId){
            users.push(await User.model.findOne({_id: balance_incomes[i].userId}))
        }
        if(balance_incomes[i].agency) {
            console.log(balance_incomes[i].agency)
            console.log(1231)
            // let agency = await Agency.findOne({_id:  balance_incomes[i].agency});
            // console.log(333)
            // agencies.push(agency);
            // let buyer = null;
            // if(!agency){
            //     return
            // }
            // console.log(agency)
            // if(agency.userId){
            //     buyer= await User.model.findOne({_id: agency.userId});
            //     users.push(buyer);

            // }else{
            //     buyer = await User.model.fondOne({name: 'wanchehui'})
            // }
            // let product = null;
            // if(agency.productId){
            //     product = await Products.model.findOne({name_zh: "万人车汇黑卡"});
            // }
            // BalanceIncomes.model.update(income._id, {
            //     $set: {
            //         buyer,
            //         product
            //     }
            // })
        }
    }
    //支出数据结构兼容
    
    // let chargeNeedToUpdate = false;
    // balance_charges.forEach(charge=>{
    //     console.log(123)
    //     // if(!charge.balanceId){
    //     //     BalanceCharges.update(charge._id, {
    //     //         $set: {
    //     //             balanceId: balance._id
    //     //         }
    //     //     })
    //     //     chargeNeedToUpdate = true;
    //     // }
    // });
    // if(chargeNeedToUpdate){
    //     balance_charges = BalanceCharge.find({userId},
    //         {skip: 0, limit: 5, sort: {createdAt: -1}});
    // }
    // //======================支出更新完毕
    ctx.body = {
        balance,
        balance_incomes,
        balance_charges,
        agencies,
        users,
    }

})


// ApiRoute.get('/api/test', async ( ctx )=>{
//     // try{
//         // const {userId} = ctx.query
//         // // console.log(`${userId}`)
//         // let balance = await Balance.findOne({userId});
//         // let balance_incomes = await BalanceIncome.find({userId}).skip(0).limit(10).sort({createdAt: -1})
//         // let balance_charges = await BalanceCharge.find({userId}).skip(0).limit(10).sort({createdAt: -1})
//         // let agencies = [];
//         // let users = [];
//         // //数据结构兼容，之后可以删除
//         // let incomeNeedToUpdate = false;
//         // for(let i=0;i<balance_incomes.length;i++) {
//         //     if(!balance_incomes.i.balanceId){
//         //         await BalanceIncome.where({_id: balance_incomes.i._id }).update({
//         //             balanceId: balance._id
//         //         })
//         //         incomeNeedToUpdate = true;
//         //     }

//         //     if(balance_incomes.i.userId){
//         //         users.push(await User.findOne({_id: balance_incomes.i.userId}))
//         //     }
//         //     if(balance_incomes.i.agency) {

//         //     }
//         // }

//         // //======================支出更新完毕
//         // ctx.body = {
//         //     balance,
//         //     balance_incomes,
//         //     balance_charges,
//         // }
//     // } catch (err) {
//     //     ctx.body = {
//     //         msg: 'fail'
//     //     }
//     // }
// })

export default ApiRoute;
