import { EXPECT_GET_MOVIES_BY_TAG, GET_MOVIES_BY_TAG_FAIL, GET_MOVIES_BY_TAG_SUCCESS } from "../actions/movies";

export default function MoviesReducer(state={
    list: [],
    movies: {

    },
    loading: false,
    failedReason: "",
    onLoadTimes: 0,
    tag: "热门"
}, action){
    switch (action.type) {
        case EXPECT_GET_MOVIES_BY_TAG:
            
            return Object.assign({}, state, {
                loading: true,
                failedReason: "",
                list: [],
                tag: action.tag,
                onLoadTimes: 0
            });
        case GET_MOVIES_BY_TAG_FAIL:
           
            return Object.assign({}, state, {
                loading: false,
                failedReason: action.reason,
                list: [],
                onLoadTimes: 0
            });
        case GET_MOVIES_BY_TAG_SUCCESS:
            let onLoadTimes = state.onLoadTimes;
            onLoadTimes++
            let movies = state.movies;
            movies[state.tag] = action.movies;
            return Object.assign({}, state, {
                list: action.movies,
                movies,
                loading: false,
                failedReason: "",
                onLoadTimes
            })
    
        default:
            return state;
    }
}