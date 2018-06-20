import add from './add.js';
import chai from 'chai';
import { getOneUser, getOneUsername } from './units/users.mjs';
import connectDB from '../bootstrap/connectdb.mjs';

let expect = chai.expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});


describe('用户数据查询测试', function(){
  before(()=>{
    connectDB();
  })
  it('默认查询一条用户数据', ()=>{
    expect(getOneUser()).to.be.ok;
  })
  it('查询18820965455的用户', (done)=>{
     getOneUsername({username: '18820965455'}).then(
      rlt => {
        expect(rlt).to.be.equal('18820965455');
        done();
      }
    );
   
  })
})


describe('测试所有的路由', ()=>{
  before(()=>{
    connectDB();
  })
  it('测试首页的载入', ()=>{
      
  })
})