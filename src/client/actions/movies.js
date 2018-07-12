import { getRemoteMovieById, getRemoteMoviesByTags } from "../services/movies";

export const EXPECT_GET_MOVIES_BY_TAG = "GET_MOVIES_BY_TAG";
export const GET_MOVIES_BY_TAG = "GET_MOVIES_BY_TAG";
export const GET_MOVIES_BY_TAG_SUCCESS = "GET_MOVIES_BY_TAG_SUCCESS";
export const GET_MOVIES_BY_TAG_FAIL = "GET_MOVIES_BY_TAG_FAIL";



export function expectGetMoviesByTag(tag){
    
    return {
        type: EXPECT_GET_MOVIES_BY_TAG,
        tag,
    }
}
export function getMoviesByTagSucess(movies){
    
    return {
        type: GET_MOVIES_BY_TAG_SUCCESS,
        movies
    }
}
function getMoviesByTagFail(reason){
    console.error(reason);
    
    return {
        type: GET_MOVIES_BY_TAG_FAIL,
        reason
    }
}

export function getMoviesByTag(tag){
    return dispatch => {
        dispatch(expectGetMoviesByTag(tag));
        return getRemoteMoviesByTags([tag]).then(rlt =>{

            if(rlt.docs){
                return dispatch(getMoviesByTagSucess(rlt.docs));
            }else{
            return dispatch(getMoviesByTagFail(rlt.err));
                
            }
            
        }).catch(err =>{
            console.log("处理错误", err);
            return dispatch(getMoviesByTagFail(err));
        })
    }
}

export const EXPECT_GET_MOVIES_BY_TAGS = "GET_MOVIES_BY_TAG";
export const GET_MOVIES_BY_TAGS = "GET_MOVIES_BY_TAG";
export const GET_MOVIES_BY_TAGS_SUCCESS = "GET_MOVIES_BY_TAG_SUCCESS";
export const GET_MOVIES_BY_TAGS_FAIL = "GET_MOVIES_BY_TAG_FAIL";



export function expectGetMoviesByTags(tags){
    return {
        type: EXPECT_GET_MOVIES_BY_TAG,
        tags,
    }
}
export function getMoviesByTagsSucess(movies){
    return {
        type: GET_MOVIES_BY_TAG_SUCCESS,
        movies
    }
}
export function getMoviesByTagsFail(reason){
    return {
        type: GET_MOVIES_BY_TAG_FAIL,
        reason
    }
}

export function getMoviesByTags(tags){
    return dispatch => {
        dispatch(expectGetMoviesByTags(tags));
        return getRemoteMoviesByTags(tags).then(rlt =>{
            return getMoviesByTagsSucess(rlt);
        }).catch(err =>{
            return getMoviesByTagsFail(err)
        })
    }
}


export const EXPECT_GET_MOVIE_BY_ID = "GET_MOVIE_BY_ID"
export const GET_MOVIE_BY_ID_FAIL = "GET_MOVIE_BY_ID_FAIL"
export const GET_MOVIE_BY_ID_SUCCESS = "GET_MOVIE_BY_ID_SUCCESS"
export const GET_MOVIE_BY_ID = "GET_MOVIE_BY_ID"

export function expectGetMovieById(id){
    return {
        type: EXPECT_GET_MOVIE_BY_ID,
        id,
    }
}

export function getMovieByIdFail(reason){
    
    return {
        type: GET_MOVIE_BY_ID_FAIL,
        reason
    }
}

export function getMovieByIdSucess(movie){
    
    return {
        type: GET_MOVIE_BY_ID_SUCCESS,
        movie,
    }
}

export function getMovieById(id){
    
    return dispatch => {
        dispatch(expectGetMovieById(id));
        return getRemoteMovieById(id).then(rlt=>{
            
            return dispatch(getMovieByIdSucess(rlt));
        }).catch(err=>{
            return dispatch(getMovieByIdFail(err));
        })
    }
}
