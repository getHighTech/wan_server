import Store from '../Store';
import { sha256 } from 'js-sha256';
import PouchDb from 'pouchdb';
import PouchDbFind from 'pouchdb-find';
PouchDb.plugin(PouchDbFind);


class User extends Store{
    constructor(){
       
        if(!this.id){
            return null;
        }
        if(!this.validToken()){
            return null;
        }
        this.findById(this.id).then(user => {
            console.log("查找到的", user);
            
            this.username = user.username;
            this.role = user.role;
            this.createdAt = user.createdAt;
        });
        
        
        
        
    }
    async validToken(){
        let stampTokens = await this.dbToken.find({
            selector: {appName: 'wuligege'}
        })
        let stampToken = stampTokens[0];
        if(!stampToken){
            return false;
        }
        if(stampToken.expireds < (new Date).getTime()){
            return false;
        }
        return true;
    }

    static async login(username, password){
        this.dbToken = await new PouchDb('tokens');
        await this.dbToken.createIndex({
            index: {fields: ['appName']}
          });
        try {
            let user = await this.findById(username);
            let token = sha256(username+user.password);
            console.log(sha256(password));
            
            
            if(sha256(password) === user.password){
                
                let stampToken = {
                    _id: token,
                    expired: (new Date()).getTime()+86400000,
                    appName: 'wuligege'
                }
                await this.dbToken.get(token).then(doc=>{
                    doc._id = token;
                    doc.expired = (new Date()).getTime()+86400000;
                    doc.appName = "wuligege";

                }).catch(err=>{
                    if(err.name="not_found"){
                        this.dbToken.put(stampToken)
                    }
                });
                

                return stampToken;

                
            }else{
                return "AUTH FAIL";
            }
            
            
        } catch (error) {
            
            return error
        }
        
    }

    getUsername(){
        if(this.validToken()){
            return this.username;
        }
    }

    static async register(username, password){
       if(!username){
           return "USERNAME REQUIRED"
       }
       if(!password){
           return "PASSWORD REQUIRED"
       }
       let crypiPassword = sha256(password);
       try {
        return await this.create({
            _id: username, 
            username,
            password: crypiPassword,
        })  
       } catch (error) {
         return error;
       }
       
    }
}

export default User;