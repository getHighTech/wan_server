import chai from 'chai';
import {dbConnection} from '../../src/server/bootstrap/connectdb.js';
import ServerKey from '../../src/server/models/ServerKey.js';
import moment from 'moment';
import App from  '../../src/server/core/initApp.js';
import ed25519 from 'ed25519';

import { generateRestFul } from '../../src/server/core/api.js';

//load models;
import { Models } from '../../src/server/models/registerModel.js';
import { checkport } from '../../src/server/utils/checkport.js';
import  uuidv4 from 'uuid/v4';
import Axios from 'axios';
import { decipher } from '../../src/both/ciphers.js';

let expect = chai.expect;

let publicKey = null;

describe('测试ServerKey模型', ()=>{
    before((done)=>{
        dbConnection.then(async (rlt)=>{
            if(rlt){
            Models.forEach(model => {
              console.log(model.collectionName);
              
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