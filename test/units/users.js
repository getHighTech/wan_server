import chai from 'chai';
import {dbConnection, connectDB} from '../../bootstrap/connectdb.mjs';
import User from '../../models/User.mjs';
import moment from 'moment';
import App from  '../../core/initApp.mjs';

import { generateRestFul } from '../../core/api.mjs';

//load models;
import { Models } from '../../models/registerModel.mjs';
import { checkport } from '../../utils/checkport.mjs';
import Axios from 'axios';



let expect = chai.expect;

describe('用户数据查询测试', function(){
    before( (done)=>{
      dbConnection.then((rlt)=>{
        if(rlt){
          done();
        }
      });
    })
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

let userId = null;

describe('测试所有用户的API', ()=>{
  before((done)=>{
    dbConnection.then(async (rlt)=>{
        if(rlt){
        Models.forEach(model => {
            generateRestFul(model.collectionName, App, model);
        });
        let port =7001;
        let isOccupied = await checkport(port);
        if(!isOccupied){
            App.listen(7001);
        }
        done();
        }
      });
  })
  it('获取用户列表（简略信息）, 只有10条, 时间倒序', (done)=>{
      let userPromise  =  Axios.get("http://localhost:7001/api/v1/users")
      userPromise.then(rlt => {
        expect(rlt.length).to.be.equal(10);
        done();

      })
  })
})