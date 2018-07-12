export const APP_SWITCH_SIDEBAR = "APP_SWITCH_SIDEBAR"

export const GET_OPENID = "GET_OPENID";


export function getOpenId(openid){
  return {
    type: GET_OPENID,
    openid
  }
}
