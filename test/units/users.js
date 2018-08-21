import chai from 'chai';
import User from '../../src/server/models/User.js';
import moment from 'moment';
import Axios from 'axios';
import ed25519 from 'ed25519';
import { decipher, cipher } from '../../src/both/ciphers.js';

let expect = chai.expect;


let uuid = "34534563456";

let publicKey = null;

let token = null;

describe('用户数据查询测试', function(){



    before((done)=>{
      Axios.get("http://127.0.0.1:7001/api/v1/get_token?uuid="+uuid).then(rlt => {
            console.log('---------------------------------------------'+rlt);
            publicKey = rlt.data.publicKey;
            let sign = rlt.data.sign;
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
      expect(uuid).to.be.equal("34534563456");
      expect(publicKey).to.not.equal(null);
      expect(token).to.not.equal(null);
    });

    it('默认查询一条用户数据', ()=>{
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

            expect(rlt.msg).to.be.equal('USER CREATE SUCCESS');
            expect(rlt.type).to.be.equal('success');
            expect(rlt.token).to.not.equal(token);
            token = rlt.token;
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
          console.log(rlt);

            expect(rlt.type).to.be.equal('error');
            expect(rlt.token).to.not.equal(token);
            token = rlt.token;
            expect(rlt.reason).to.be.equal('WRONG PASSWORD');
            done();
        }
      ).catch(err=>{
        console.log("User.pwdLogin的错误", err);
      });
    });

    it('测试User.pwdLogin方法，testuser1234用户登录, 密码为"testuser12345"', (done)=>{
        let passowrd = cipher('aes192', token, "testuser12345");
        User.pwdLogin({username: 'testuser1234', passowrd, sign: token, uuid}).then(
        rlt => {
            console.log(rlt);

            expect(rlt.token).to.not.equal(token);
            token = rlt.token;
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
            expect(rlt.token).to.equal(token);
            token = rlt.token;
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



})


describe('测试所有用户的API', ()=>{


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
            
            let firtMoment = rlt.data.records[0].createdAt;
            let secondMoment = rlt.data.records[1].createdAt;
            let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
            expect(rlt.data.records.length).to.be.equal(10);
            expect(isUpdate).to.be.equal(true);
            done();

        })
    });

    it('创建一个用户testuser7791，加密密码test7791', (done)=>{
      let passowrd = cipher('aes192', token, "test7791");
      Axios.put("http://localhost:7001/api/v1/user_reg?uuid="+uuid+"&token="+token,
      {
        username: 'testuser7791', passowrd, sign: token, uuid
      }
      ).then(rlt => {
        console.log("注册返回消息", rlt);
        
        expect(rlt.data.type).to.be.equal("success");
      }).catch(err => {
        console.log("错误1", err);
        
      })

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

})
