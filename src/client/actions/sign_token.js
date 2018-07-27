import { cipher } from '../../both/ciphers';
import { getRemoteToken } from '../services/tokens';

export function signToken(msg, publicKey){
    let msgCiphered = cipher('aes192', publicKey, msg); 
    return {
        msg,
        msgCiphered
    };
}

//获取密钥
export function getToken(){
    getRemoteToken().then(
        rlt => {
            console.log(rlt);
            
        }
    ).catch(
        err => {
            console.log(err);
            
        }
    )
}
//验证密钥
export function validToken(pulicKey, msg, msgCiphered, uuid){

}