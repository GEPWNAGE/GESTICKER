import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers, { State } from './reducers';

export default function configureStore() {
    const reducer = combineReducers<State>(reducers);

    const middleware = [
        thunkMiddleware,
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore<State>(
        reducer,
        composeEnhancers(applyMiddleware(...middleware)),
    );
}
