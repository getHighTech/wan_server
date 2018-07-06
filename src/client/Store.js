import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

const db =  new PouchDB('http://jiangshan.ml:5984/jiangshan', {
        username: 'admin',
        password: 'xsq@519'
    });

export default class Store {
     static async findById(id){
        try {
            return await db.get(id);
        } catch (error) {
            return error;
        }
        
    }

    

     static async update(id){
        try {
            let doc = await db.get(id);
            let result = db.put(doc._id);
            return result;
        } catch (error) {
            return error
        }
    }
    static async create(doc){
        if(!doc._id){
            return "NEW DATA MUST CONTAIN _ID"
        }
        let testDoc = await db.get(doc._id);
        if(testDoc){
            return "DATA ALREADY EXIST";
        }
        return await db.put(doc);
    }
}