import chai from 'chai';
import Order from '../../src/server/models/Order';
import ShopOrder from '../../src/server/models/ShopOrder';
import Balance from '../../src/server/models/Balance';
import BalanceIncome from '../../src/server/models/BalanceIncome';
import User from '../../src/server/models/User';


let expect = chai.expect;

describe('测试订单支付状态，追踪更新', function(){

    it('验证最新更新的订单结果', (done)=>{
       Order.model.find({}, ['_id', 'userId','status', "products", "user", "updatedAt"], {
           skip: 0,
           limit: 10,
           sort: {
               updatedAt: -1,
           }
       }).then(rlt => {
        console.log("ORder",rlt);
        expect(rlt).to.exist;
       
        done();
            
        
            
        
       }).catch(err => {
           console.log(err);
           
       });
    });
    it('在支付完成功后，验证店铺订单结果', (done)=>{
        ShopOrder.model.find({},["userId", "status", "shopId", "updatedAt"], {
            skip: 0,
            limit: 10,
            sort: {
                updatedAt: -1,
            } 
        }).then(rlt => {
            console.log("ShopOrder",rlt);
            expect(rlt).to.exist;
            done();
            
        }).catch(err => {
            console.log(err);
            
        });
     });
     it('在支付完成功后，验证账户结果', (done)=>{
        Balance.model.find({}, ['userId', "createdAt", "orderId", "updatedAt", "amount"], {
            skip: 0,
            limit: 10,
            sort: {
                updatedAt: -1,
            }
        }).then(rlt => {
            console.log("Balance",rlt);
            expect(rlt).to.exist;
            done();
            
        }).catch(err => {
            console.log(err);
            
        });
     });
     it('在支付完成功后，验证收入结果', (done)=>{
        BalanceIncome.model.find({},["reasonType", "amount", "updatedAt", "text"],{
            skip: 0,
            limit: 10,
            sort: {
                updatedAt: -1,
            }
        }).then(rlt => {
             console.log("BalanceIncome",rlt);
             expect(rlt).to.exist;
            done();
             
        }).catch(err => {
            console.log(err);
            
        });
     });
  
});
