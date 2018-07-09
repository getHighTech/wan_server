import { EXPECT_GET_MOVIE_BY_ID, GET_MOVIE_BY_ID_SUCCESS, GET_MOVIE_BY_ID_FAIL } from '../actions/movies.js'
export default function MovieReducer(state={
    movie: null,
    loading: false,
    err: null
}, action){
    switch (action.type) {
        case EXPECT_GET_MOVIE_BY_ID:
            
            return Object.assign({}, state, {
                loading: true,
            });
        case GET_MOVIE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                movie: action.movie,
                loading: false,
                err: null
            });

        case GET_MOVIE_BY_ID_FAIL:
            return Object.assign({}. state, {
                movie: null,
                loading: false,
                err: action.reason,
            })
        
    
        default:
            return state;
    }
}