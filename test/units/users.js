import chai from 'chai';
import User from '../../src/server/models/User.js';
import moment from 'moment';
//load models;
import Axios from 'axios';

let expect = chai.expect;

describe('用户数据查询测试', function(){
    
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


describe('测试所有用户的API', ()=>{
  

  it('获取用户列表（简略信息）, 只有10条, 时间倒序', (done)=>{
      let userPromise  =  Axios.get("http://localhost:7001/api/v1/users")
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

  it('获取用户列表第8页详细信息, 有8条, 时间倒序', (done)=>{
    let userPromise  =  Axios.get("http://localhost:7001/api/v1/users?version=detail&page=3&pagesize=8")
    userPromise.then(rlt => {
        let firtMoment = rlt.data[0].createdAt;
        let secondMoment = rlt.data[1].createdAt;
        let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
        expect(rlt.data.length).to.be.equal(8);
        expect(isUpdate).to.be.equal(true);
        done();
    })
});

it('获取用户列表第8页简略信息, 有8条, 时间倒序', (done)=>{
  let userPromise  =  Axios.get("http://localhost:7001/api/v1/users?version=breif&page=3&pagesize=8")
  userPromise.then(rlt => {
      let firtMoment = rlt[0].createdAt;
      let secondMoment = rlt[1].createdAt;
      let isUpdate = moment(firtMoment).isAfter(moment(secondMoment));
      expect(rlt.length).to.be.equal(10);
      expect(isUpdate).to.be.equal(true);
      done();
  })
});

it('根据用户Id: NR4uitrWdh9eL649k,查询一个用户， 其用户名为lawadmin', (done)=>{
  let userPromise  =  Axios.get("http://localhost:7001/api/v1/users/NR4uitrWdh9eL649k")
  userPromise.then(rlt => {
      expect(rlt.username).to.be.equal('lawadmin');
      done();
  })
});
it('创建一个用户，用户名为testuser87, 密码为testuser872017best, 电话号码为1391234567', (done)=>{
  let userPromise  =  Axios.post("http://localhost:7001/api/v1/users/create",
  {username: "testuser87", passowrd: "testuser872017best", mobile: "1391234567"})
  userPromise.then(rlt => {
      let user = User.model.findById(rlt);
      expect(user.username).to.be.equal('testuser87');
      expect(user.profile.mobile).to.be.equal('1391234567')
      done();
  })
});
it('删除一个用户，用户名为testuser87', (done)=>{
  let userPromise  =  Axios.post("http://localhost:7001/api/v1/users/delete",
  {username: "testuser87"})
  userPromise.then(rlt => {
    let user = user.model.findOne({username: 'testuser87'})
      expect(user).to.be.equal(null)
      expect(rlt).to.be.equal(1)
      done();
  })
});

it('获取用户的OPENID', (done)=>{
  let userPromise  =  Axios.post("http://localhost:7001/api/v1/nomodel/wechat/users/openid");
  userPromise.then(rlt => {
    let user = user.model.findOne({username: 'testuser87'})
      expect(user).to.be.equal(null)
      expect(rlt).to.be.equal(1)
      done();
  })
})


//测试所有用户的API
})
