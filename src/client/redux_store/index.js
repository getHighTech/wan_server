import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import AppReducer from '../reducers/AppReducer'
import MoviesReducer from '../reducers/MoviesReducer'
import MovieReducer from '../reducers/MovieReducer'
export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
  );
  return createStore(
    combineReducers({
      AppReducer,
      MoviesReducer,
      MovieReducer
    }),
    enhancer);
}