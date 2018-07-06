import { APP_SWITCH_SIDEBAR } from "../actions/app";

export default function AppReducer(state={
    sideBarOpen: true,
    anchor: 'left'
}, action){
    switch (action.type) {
        case APP_SWITCH_SIDEBAR:
            
            return Object.assign({}, state, {
                sideBarOpen: !state.sideBarOpen
            })
    
        default:
            return state;
    }
}