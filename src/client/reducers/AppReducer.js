import { APP_SWITCH_SIDEBAR } from "../actions/app";

export default function AppReducer(state={
    sideBarOpen: true,
    anchor: 'left',
    openid: null,
}, action){
    switch (action.type) {
        case APP_SWITCH_SIDEBAR:

            return Object.assign({}, state, {
                sideBarOpen: !state.sideBarOpen
            });

        case GET_OPENID:
            return Object.assign({}, state, {
                openid: action.openid
            });

        default:
            return state;
    }
}
