import Axios from 'axios';


export async function getUsers(){
  let res  = await Axios.get("/api/v1/users?version=detail&page=3&pagesize=8");
  let users = res.data;
  console.log(users);
  return users;
}
