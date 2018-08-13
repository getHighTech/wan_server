import WanModel from "../core/model.js";
import request from "request";
import Axios from 'axios';

import https from 'https'

class MobileSMS extends WanModel {
    constructor(props){
        super(props);
        this.collection = "mobile_smss";
    }
    static async getMobileSMS(mobile){

        let apikey = "11bd70b637fe474bcb617e691a5fba3d";
  	    let num="";
		for(let i=0;i<4;i++)
		{
			num+=Math.floor(Math.random()*10);
		}
          let text = "【万车汇网】欢迎使用万车汇，您的手机验证码是"+num+"。本条信息无需回复";
        try {

        let params = {
            "apikey": apikey,
            "mobile": mobile,
            "text": text,
        }
        try {

            await Axios({
                method:"post",
                url:"https://sms.yunpian.com/v2/sms/single_send.json",
                params,
                httpsAgent: new https.Agent({ keepAlive: true }),
                headers:{
                    "Accept":"application/json; charset=utf-8",
                    "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
                }
            });

            await this.model.create({
                mobile,
                SMS: num,
            })
            
        } catch (error) {
            return {
                type: "error",
                reason: error,
            }
        }   
       
        return num;
            
        } catch (error) {
            console.error(error);
            return false;
            
        }
        
    }

    static async validSMS(mobile){
        let rlt = await this.model.findOne({mobile});
        let SMS = rlt.SMS;
        await this.model.remove({mobile});
        return SMS;
    }

    static async validUserSMS(SMS, mobile){
        try {
            let rlt = await this.model.findOne({SMS, mobile});
            if(!rlt){
                return false;
            }
            return  true;
            
        } catch (error) {
            return error;
            
        }
        
    }
}

MobileSMS.setScheme(
    {
      "mobile": String,
      "SMS": String,


    },
    "MobileSMS", "mobile_smss"

)

export default  MobileSMS;
