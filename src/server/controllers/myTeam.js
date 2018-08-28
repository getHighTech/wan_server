import mongoose from 'mongoose';
import MyTeam from '../models/MyTeam.js';
import User from '../models/User.js';


export const getTeam = async(ctx) => {
    try{
        const { SuserId } =ctx.query;
        console.log(SuserId);
        const myteam = await MyTeam.model.find({SuserId:SuserId,status:true});
        console.log('-------------------');
        console.log(myteam);
        const myteams = [];
        if (myteam.length>=1) {
          for (let i = 0; i < myteam.length; i++) {
            let obj = new Object();
            let  user = await User.model.findOne({'_id':myteam[i].userId})
            obj.name= user.username;
            console.log(myteam[i].createdAt);
            if (typeof(myteam[i].createdAt)=='undefined') {
              obj.jointime='加入时间有误'
            }else {
              obj.jointime=myteam[i].createdAt
            }

            myteams.push(obj)
          }
          ctx.body={
            myteams
          }
        }
        else {
          ctx.body={
            myteams
          }
        }

      }
      catch (err) {
          ctx.body = {
              msg: 'fail'
          }
      }
}
