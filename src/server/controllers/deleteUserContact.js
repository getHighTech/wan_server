import mongoose from 'mongoose';
import UserContacts from '../models/UserContacts.js';


export const  deleteUserContact = async(ctx) => {
    try{
        const { contactId } = ctx.query;
        const delRlt = await UserContacts.model.update({_id:contactId},{
          $set:{
            deleted:true
          }
        })
        ctx.body = {
        delRlt
        }
    }
    catch (err) {
        ctx.body = {
          msg: 'fail'
        }
     }
}
