import User from '../../models/User.mjs'
export async function getOneUser(){
    let user = await User.findOne({});
    return user;
}

export async function getOneUsername(params){
    let user = await User.findOne(params);
    return user.username;
}
