import mongoose from 'mongoose';
import ENV from './loadEnv.js';
import dburl from '../config/db.js';

const getMongoUrlByEnv = dburl[ENV];

const options = {
    autoIndex: true, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true
  };

export function connectDB(){
    console.log("正在连接数据库....");

    mongoose.connect(getMongoUrlByEnv, options).then(
        rlt=> {
            if(rlt){
                console.log("成功连接数据库");

            }else{
                console.log("连接数据库失败, 请检查配置");

            }

        },
        err => {
            console.log("存在错误", err);

        }
    );
}

export const dbConnection = mongoose.connect(getMongoUrlByEnv, options);
