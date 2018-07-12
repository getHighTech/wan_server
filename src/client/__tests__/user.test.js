import Store from '../Store';
import User from '../models/User';
import chai from 'chai';

let expect = chai.expect;

test('开始测试数据库类的方法');

test('测试store.findById方法', (done)=>{

        Store.findById('simontaosim').then(rlt=>{
            expect(rlt.username).to.be.equal('simontaosim')

            done();
        }).catch(err=>{
            for (const key in err) {
                if (err.hasOwnProperty(key)) {
                    const element = err[key];
                    console.log('错误', element);
                }
            }
            done();
            
        });
    
    
})

test('测试User.login方法', (done)=>{
     User.login('simontao', 'simontao112358').then(rlt=>{
        expect(rlt.appName).to.be.equal('wuligege');
        done();
    });
    
   
})