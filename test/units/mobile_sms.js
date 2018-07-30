import chai from 'chai';
import MobileSMS from '../../src/server/models/MobileSMS.js';


let expect = chai.expect;

describe('MobileSMS类短信验证方法测试', function(){
    //由于运营商限制，此类测试不可频繁调用

    // it('测试getMobileSMS方法，发送短信给18820965455', (done)=>{
    //     MobileSMS.getMobileSMS("18820965455").then(rlt=>{
    //         expect(rlt).to.exist;
    //         done();
    //     });
    // });
    // it("测试validSMS方法, 返回验证成功，并且成功删除了这条揭露", (done)=>{
    //     MobileSMS.validSMS("18820965455").then(rlt1=>{
    //         expect(rlt1).to.exist;
    //         MobileSMS.model.findOne({mobile: "188209654555"}).then(
    //             rlt2 => {
    //                 console.log(rlt2);
                    
    //                 expect(rlt).to.be(false);
    //                 done();

    //             }
                
    //         );
    //     })
    // })
});
