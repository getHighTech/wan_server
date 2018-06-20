
import mongoose from 'mongoose';


class WanModel {

    static setScheme(schema, modelName, collectionName){
         this.schema = new mongoose.Schema(
            schema, { _id: true }
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

    static async insertMany(params){
        //params is Array
       let rlts =  this.model.insertMany(params);
       return rlts;
       
    }
    static async addColumn(columnName){
        let rlt  = await this.schema.add(columnName);
        return rlt;
    }

    static async find(condition){
        let rlt  = await this.model.find(condition);
        return rlt;
    }

    static async findOne(condition){
        let rlt  = await this.model.findOne(condition);
        return rlt;
    }

    static async findById(id){
        let rlt  = await this.model.findById(id);
        return rlt;
    }
}

export default WanModel