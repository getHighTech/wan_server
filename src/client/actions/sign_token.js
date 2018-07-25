import ed25519 from 'ed25519';
import { cipher } from '../../both/ciphers';

export function signToken(msg, publicKey){
    let msgCiphered = cipher('aes192', publicKey, msg); 
    //进行签名
    let signature = ed25519.Sign(new Buffer(msgCiphered, 'utf8'), privateKey); 
    return {
        signature,
        msgCiphered
    };
}