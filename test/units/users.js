import chai from 'chai';
import User from '../../src/server/models/User.js';
import Products from '../../src/server/models/Products.js';
import BankCard from '../../src/server/models/BankCard.js';
import moment from 'moment';
import Axios from 'axios';
import ed25519 from 'ed25519';
import { decipher, cipher } from '../../src/both/ciphers.js';

let expect = chai.expect;


let uuid = "34534563456";

let sign = null;

let publicKey = null;

let token = null;

describe('用户数据查询测试', function(){

// <<<<<<< HEAD
//     it('默认查询一条用户数据1', ()=>{
// =======

    before((done)=>{
      Axios.get("http://127.0.0.1:7001/api/v1/get_token?uuid="+uuid).then(rlt => {
            console.log('---------------------------------------------'+rlt);
            publicKey = rlt.data.publicKey;
            sign = rlt.data.sign;
            let randomString = rlt.data.randomString;
            let msgCiphered = rlt.data.msgCiphered;
            token = msgCiphered;

            if(ed25519.Verify(Buffer.from(msgCiphered), Buffer.from(sign), Buffer.from(publicKey))){
                 // 验证函数返回了true，通过验证
                var msg = decipher('aes192', new Buffer(publicKey, 'utf8'), msgCiphered);  //使用公钥解密
                console.log("用户获得签名");

                expect(msg).to.be.equal(randomString);
                done();
            }

          }).catch(err => {
              console.log(err);

          });
    });

    it('此类测试之前，uuid和sign, 以及publickey都是存在的', ()=>{
      expect(uuid).to.be.equal("34534734563456");
      expect(sign).to.not.equal(null);
      expect(publicKey).to.not.equal(null);
      expect(token).to.not.equal(null);
    });

    it('默认查询一条用户数据', ()=>{
// >>>>>>> 7beac6cc7c434455c3608c05539bc43c1cf6a0f6
      expect(User.model.findOne()).to.be.ok;
    });

    it('查询18820965455的用户', (done)=>{

     User.model.findOne({username: '18820965455'}).then(
      (rlt) => {
        if(rlt){
          expect(rlt.username).to.be.equal('18820965455');
          done();
        }

      }
    );
    });
    it("删除testuser1234用户", done => {
      User.model.remove({"username": "testuser1234"}).then(rlt=> {
        console.log(rlt);
        done();
      })
    })
    it('测试User.reg方法，新建testuser1234用户， 密码为testuser12345', (done)=>{
      let passowrd = cipher('aes192', token, "testuser12345");
        User.reg(
          {
            username: 'testuser1234',
            passowrd,
            sign: token,
            uuid
          }).then(
        rlt => {
            // console.log({rlt});
            expect(rlt.regUsername).to.be.equal('testuser1234');
            expect(rlt.token).to.not.equal(token);
            expect(rlt.token).to.exist;
            done();
        }
      ).catch(err=>{
        console.log("User.reg的错误", err);
      });
    });

    it('测试User.pwdLogin方法，testuser1234用户登录, 密码为"password"', (done)=>{
      let passowrd = cipher('aes192', token, "password");
        User.pwdLogin({username: 'testuser1234', passowrd, sign: token, uuid}).then(
        rlt => {
            // console.log({rlt});
            expect(rlt.type).to.be.equal('error');
            expect(rlt.reason).to.be.equal('PASSWORD WRONG');
            expect(rlt.option).to.be.equal('OLD USER WITH MOBILE');
            done();
        }
      ).catch(err=>{
        console.log("User.reg的错误", err);
      });
    });

    it('测试User.pwdLogin方法，testuser1234用户登录, 密码为"testuser12345"', (done)=>{
        let passowrd = cipher('aes192', token, "testuser12345");
        User.pwdLogin({username: 'testuser1234', passowrd, sign: token, uuid}).then(
        rlt => {
            // console.log({rlt});
            expect(rlt.token).to.not.equal(token);
            expect(rlt.msg).to.be.equal('LOGIN SUCCESS');
            done();
        }
      ).catch(err=>{
        console.log("User.reg的错误", err);
      });

    });

    it('测试User.pwdLogin方法，##$afwef23用户登录, 密码为"testuser12345"', (done)=>{
        let passowrd = cipher('aes192', token, "testuser12345");
        User.pwdLogin({username: '##$afwef23', passowrd, sign: token, uuid}).then(
        rlt => {
            // console.log({rlt});
            expect(rlt.type).to.be.equal('error');
            expect(rlt.reason).to.be.equal('USER EMPTY');
            done();
        }
      ).catch(err=>{
        console.log("User.reg的错误", err);
      });

    });

    it('查询前10条用户数据，并且按照时间顺序倒序排列,并且指定只要用户名和创建时间的字段',  (done)=> {
        User.model.find({}).skip(0).limit(10).sort({createdAt: -1}).then(
        rlt => {
          let firtMoment = rlt[0].createdAt;
          let secondMoment = rlt[1].createdAt;
          let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
          expect(rlt.length).to.be.equal(10);
          expect(isUpdate).to.be.equal(true);
          done();
        }
      )
    });
    it('根据用户Id: NR4uitrWdh9eL649k,查询一个用户， 其用户名为lawadmin',  (done)=> {
        User.model.findOne({'username':'lawadmin'}).then(
        rlt => {
          expect(rlt.username).to.be.equal('lawadmin');
          done();
        }
      )
    });
    it('根据用户名username: 18820965455,将其nickname修改为 zsx_test',  (done)=> {
        User.model.update({'username':'18820965455'},{$set:{nickname:'zsx_test'}},function (error,rlt) {
          if (error) {
              console.error(error);
          } else {
              console.error("更新nickname成功")
              User.model.findOne({username: '18820965455'},function(err,alt){
                if (!err) {
                  expect(alt.nickname).to.be.equal('zsx_test');
                  done();
                }
              })




          }
      })
    });
    it('根据shopId: YhCNM6PqYrqTGMehh,查询4个', (done)=>{
      Products.model.find({'shopId':'YhCNM6PqYrqTGMehh'}).skip(0).limit(4).exec(function(err,alt){
        console.log('188---------------------------------------------------');
        if (!err) {
          console.log(alt);
          expect(alt.length).to.be.equal(4);
          done();
        }
        else {
          console.log(err);
        }
      })
    });
    it('根据userId:AT7p7bspKthfSMx7Q,查询该用户的bankcard', (done)=>{
      BankCard.model.find({'userId':'AT7p7bspKthfSMx7Q'}).exec(function(err,alt){
        console.log('201---------------------------------------------------');
        if (!err) {
          console.log(alt);
          expect(alt.length).to.be.equal(2);
          done();
        }
        else {
          console.log(err);
        }
      })
    });
})


describe('测试所有用户的API', ()=>{
// <<<<<<< HEAD
//
//
//   it('获取用户列表（简略信息）, 只有10条, 时间倒序', (done)=>{
//       let userPromise  =  Axios.get("http://localhost:7001/api/v1/users")
//       userPromise.then(rlt => {
//           let firtMoment = rlt.data[0].createdAt;
//           let secondMoment = rlt.data[1].createdAt;
//           let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
//           expect(rlt.data.length).to.be.equal(10);
//           expect(isUpdate).to.be.equal(true);
//           done();
//
//       })
//   });
//
//   it('获取用户列表第3页详细信息, 有8条, 时间倒序', (done)=>{
//     let userPromise  =  Axios.get("http://localhost:7001/api/v1/users?version=detail&page=3&pagesize=4")
//     userPromise.then(rlt => {
//         let firtMoment = rlt.data[0].createdAt;
//         let secondMoment = rlt.data[1].createdAt;
//         let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
//         expect(rlt.data.length).to.be.equal(4);
//         expect(isUpdate).to.be.equal(true);
//         done();
//     })
// });
//
// it('获取用户列表第8页简略信息, 有8条, 时间倒序', (done)=>{
//   let userPromise  =  Axios.get("http://localhost:7001/api/v1/users?version=breif&page=8&pagesize=8")
//   userPromise.then(rlt => {
//     let firtMoment = rlt.data[0].createdAt;
//     let secondMoment = rlt.data[1].createdAt;
//       let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
//       expect(rlt.data.length).to.be.equal(8);
//       expect(isUpdate).to.be.equal(true);
//       done();
//   })
// });
//
// it('根据用户Id: NR4uitrWdh9eL649k,查询一个用户， 其用户名为lawadmin', (done)=>{
//   let userPromise  =  Axios.get("http://localhost:7001/api/v1/users/lawadmin")
//   userPromise.then(rlt => {
//     console.log('93---------------------------');
//     let zsx = rlt.auth_cards
//       expect(rlt.data.username).to.be.equal('lawadmin');
//       done();
//   })
// });
// it('创建一个用户，用户名为testuser87, 密码为testuser872017best, 电话号码为1391234567', (done)=>{
//   let userPromise  =  Axios.post("http://localhost:7001/api/v1/users/create",
//   {username: "testuser87", passowrd: "testuser872017best", mobile: "1391234567"})
//   userPromise.then(rlt => {
//       let user = User.model.findById(rlt);
//       expect(user.username).to.be.equal('testuser87');
//       expect(user.profile.mobile).to.be.equal('1391234567')
//       done();
//   })
// });
// it('删除一个用户，用户名为testuser87', (done)=>{
//   let userPromise  =  Axios.post("http://localhost:7001/api/v1/users/delete",
//   {username: "testuser87"})
//   userPromise.then(rlt => {
//     let user = user.model.findOne({username: 'testuser87'})
//       expect(user).to.be.equal(null)
//       expect(rlt).to.be.equal(1)
//       done();
//   })
// });
//
// it('获取用户的OPENID', (done)=>{
//   let userPromise  =  Axios.post("http://localhost:7001/api/v1/nomodel/wechat/users/openid");
//   userPromise.then(rlt => {
//     let user = user.model.findOne({username: 'testuser87'})
//       expect(user).to.be.equal(null)
//       expect(rlt).to.be.equal(1)
//       done();
//   })
// })
// =======
      before((done)=>{
        Axios.get("http://127.0.0.1:7001/api/v1/get_token?uuid="+uuid).then(rlt => {
              publicKey = rlt.data.publicKey;
              sign = rlt.data.sign;
              let randomString = rlt.data.randomString;
              let msgCiphered = rlt.data.msgCiphered;
              token = msgCiphered;

              if(ed25519.Verify(Buffer.from(msgCiphered), Buffer.from(sign), Buffer.from(publicKey))){
                   // 验证函数返回了true，通过验证
                  var msg = decipher('aes192', new Buffer(publicKey, 'utf8'), msgCiphered);  //使用公钥解密
                  console.log("用户获得签名");

                  expect(msg).to.be.equal(randomString);
                  done();
              }

            }).catch(err => {
                console.log(err);

            });
      });

    it('获取用户列表（简略信息）, 只有10条, 时间倒序', (done)=>{
        let userPromise  =  Axios.post(
          "http://localhost:7001/api/v1/users?uuid="+uuid+"&token="+token,

          {
            condition: {},
            page: 1,
            pagesize: 10,
            fields: ["username", "createdAt"],
            sort: {createdAt: -1}
          }
          
        );
        userPromise.then(rlt => {
            console.log(rlt.data);

            let firtMoment = rlt.data[0].createdAt;
            let secondMoment = rlt.data[1].createdAt;
            let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
            expect(rlt.data.length).to.be.equal(10);
            expect(isUpdate).to.be.equal(true);
            done();

        })
    });

    it('创建一个用户testuser7791，加密密码test7791', (done)=>{

    });

    let sms = null;

    it('手机验证码创建或者登陆, 用户testuser8800, 若是创建需要用户设置密码, 密码为test8800', (done)=>{

    });

    it('查看testuser7791的个人信息', (done)=>{

    });
    it('查看testuser8800的个人信息', (done)=>{
    });
    it('登出testuser7791', (done)=>{
    });

    it('登出testuser8800', (done)=>{
    });
    it('查看testuser7791的个人信息', (done)=>{
    });
    it('查看testuser8800的个人信息', (done)=>{
    });
    it('用户名密码登录testuser8800', (done)=>{
    });
    it('用户名密码登录testuser7791', (done)=>{
    });
    it('修改testuser7791个人资料中的手机号，手机号为18820965455', (done)=>{
    });
    it('登出testuser7791', (done)=>{
    });
    it('手机号验证码登录testuser7791', (done)=>{
    });
// >>>>>>> 7beac6cc7c434455c3608c05539bc43c1cf6a0f6


//测试所有用户的API
})
