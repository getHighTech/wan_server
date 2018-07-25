import chai from 'chai';
import {dbConnection} from '../../src/server/bootstrap/connectdb.js';
import ServerKey from '../../src/server/models/ServerKey.js';
import App from  '../../src/server/core/initApp.js';


import { generateRestFul } from '../../src/server/core/api.js';

//load models;
import { Models } from '../../src/server/models/registerModel.js';
import { checkport } from '../../src/server/utils/checkport.js';


import ed25519 from 'ed25519';
import  uuidv4 from 'uuid/v4';
import Axios from 'axios';
import { decipher } from '../../src/both/ciphers.js';
import { validClient } from '../../src/server/middles/serverkey.js';

let expect = chai.expect;

let publicKey = null;

describe('测试ServerKey模型', ()=>{
    before((done)=>{
        dbConnection.then(async (rlt)=>{
            if(rlt){
            Models.forEach(model => {
              console.log(model.collectionName);
                App.use(validClient);
                generateRestFul(model.collectionName, App, model);

            });
            let port =7001;
            let isOccupied = await checkport(port);
            if(!isOccupied){
                App.listen(7001);
                console.log("测试地址在7001端口");
                
            }
            done();
            }
          });
      })
    it('获取用户的公钥', (done)=>{
        const uuid = uuidv4();
        ServerKey.genPublicKey(uuid, "random", {}, null)
        .then(rlt => {
            publicKey = rlt.publicKey;
            let sign = rlt.sign;
            let randomString = rlt.randomString;
            let msgCiphered = rlt.msgCiphered
            if(ed25519.Verify(new Buffer(msgCiphered, 'utf8'), sign, publicKey)){
                 // 验证函数返回了true，通过验证
                var msg = decipher('aes192', publicKey, msgCiphered);  //使用公钥解密
                expect(msg).to.be.equal(randomString);
                done();
            }
            
        })
    })
    it('测试ServerKey的公钥生成方法', (done)=>{
        done();
      })
  });

  let uuid = "6678";
  let token = null;


  describe("测试ServerKeyAPI", ()=>{
      it("获取用户的公钥,并且验证", done => {
          Axios.get("http://127.0.0.1:7001/api/v1/get_token?uuid="+uuid).then(rlt => {
            publicKey = rlt.data.publicKey;
            let sign = rlt.data.sign;
            let randomString = rlt.data.randomString;
            let msgCiphered = rlt.data.msgCiphered;
            token = msgCiphered;

            if(ed25519.Verify(Buffer.from(msgCiphered), Buffer.from(sign), Buffer.from(publicKey))){
                 // 验证函数返回了true，通过验证
                var msg = decipher('aes192', new Buffer(publicKey, 'utf8'), msgCiphered);  //使用公钥解密
                expect(msg).to.be.equal(randomString);
                done();
            }
            
          }).catch(err => {
              console.log(err);
              
          });
   
      });

      it("用户设备的UUID和sign去验证， 上一个测试的结果是否正确", done => {
          
        Axios.get("http://127.0.0.1:7001/api/v1/valid_token?uuid="+uuid+"&token="+token).then(rlt => {
            if(rlt.data){
                done();

            }

            
        })
      });


  })