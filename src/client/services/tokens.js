import  uuidv4 from 'uuid';
import Axios from 'axios';
export function getRemoteToken(){
    let uuid = uuidv4().v4;
    return Axios.get('/api/v1/get_token?uuid='+uuid);
}