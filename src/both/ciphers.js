//解密
import crypto from 'crypto';

export function cipher(algorithm, key, buffer){
    var encrypted = "";
    var cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buffer, 'utf8', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
}

//解密
export function decipher(algorithm, key, encrypted){
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}