import chai from 'chai';
import MobileSMS from '../../src/server/models/MobileSMS.js';

const readline = require('readline');

function readSyncByRl(tips) {
    tips = tips || '> ';

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}


let expect = chai.expect;

describe('MobileSMS类短信验证方法测试', function(){
    ///由于运营商限制，此类测试不可频繁调用

    it('测试getMobileSMS方法，发送短信给18820965455', (done)=>{
        MobileSMS.getMobileSMS("18820965455").then(rlt=>{
            console.log("验证码返回", rlt);
            
            expect(rlt).to.exist;
            readSyncByRl('请输入验证码').then((res) => {
                console.log(rlt);
                
                expect(rlt).to.be.equal(res);
                done();

            });

           
        }).catch(err => {
            console.log(err);
            
        });
    });
    it("测试validSMS方法, 返回验证成功，并且成功删除了这条记录", (done)=>{
        MobileSMS.validSMS("18820965455").then(rlt1=>{
            console.log(rlt1);
            
            expect(rlt1).to.exist;
            MobileSMS.model.findOne({mobile: "188209654555"}).then(
                rlt2 => {
                    console.log(rlt2);
                    
                    expect(rlt2).to.not.exist;
                    done();

                }
                
            );
        })
    })
});
