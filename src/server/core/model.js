
import mongoose from 'mongoose';


class WanModel {

    static setScheme(schema, modelName, collectionName){
         this.schema = new mongoose.Schema(
            schema
        );
        this.model = mongoose.model(modelName, schema);
        this.collectionName = collectionName;
        //此处根据表名生成restful api
        // exg: users/1/create

    }
    static getScheme(){
        return this.schema;
    }
    static async  create(params){
        let rlt = await  this.model.create(params);
        return rlt;
    }
    static async litmit(page=0, pagesize=10){

    }
    static async sortLimitByTime(page=0, pagesize=10){

    }
    static async getOne(id){

    }
    static async update(id, params){

    }

    static async deleteOne(id){

    }



}

export default WanModel
