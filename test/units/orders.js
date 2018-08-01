import chai from 'chai';
import Order from '../../src/server/models/Order';
import ShopOrder from '../../src/server/models/ShopOrder';
import Balance from '../../src/server/models/Balance';
import BalanceIncome from '../../src/server/models/BalanceIncome';


let expect = chai.expect;

describe('测试订单支付状态，追踪更新', function(){

    it('验证最新更新的订单结果', (done)=>{
       Order.model.find({status: "paid"}).sort({updatedAt: -1}).limit(10).then(rlt => {
        console.log(rlt);
        expect(rlt).to.exist;
            done();
        
       }).catch(err => {
           console.log(err);
           
       });
    });
    it('在支付完成功后，验证店铺订单结果', (done)=>{
        ShopOrder.model.find({status: "paid"}).sort({updatedAt: -1}).limit(10).then(rlt => {
            console.log(rlt);
            expect(rlt).to.exist;
            done();
            
        }).catch(err => {
            console.log(err);
            
        });
     });
     it('在支付完成功后，验证账户结果', (done)=>{
        Balance.model.find({userId: {$exists: true}}).sort({updatedAt: -1}).limit(10).then(rlt => {
            console.log(rlt);
            expect(rlt).to.exist;
            done();
            
        }).catch(err => {
            console.log(err);
            
        });
     });
     it('在支付完成功后，验证收入结果', (done)=>{
        BalanceIncome.model.find({userId: {$exists: true}}).sort({updatedAt: -1}).limit(10).then(rlt => {
             console.log(rlt);
             expect(rlt).to.exist;
            done();
             
        }).catch(err => {
            console.log(err);
            
        });
     });
    // it("测试validSMS方法, 返回验证成功，并且成功删除了这条揭露", (done)=>{
    //     MobileSMS.validSMS("18820965455").then(rlt1=>{
    //         console.log(rlt1);
            
    //         expect(rlt1).to.exist;
    //         MobileSMS.model.findOne({mobile: "188209654555"}).then(
    //             rlt2 => {
    //                 console.log(rlt2);
                    
    //                 expect(rlt2).to.not.exist;
    //                 done();

    //             }
                
    //         );
    //     })
    // })
});
