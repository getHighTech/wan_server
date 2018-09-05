import mongoose from 'mongoose';
import User  from '../models/User.js';


export const login  = async(ctx) => {
  
        console.log(ctx.request.body)
       ctx.body = ctx.request.body
       
       
    
}


