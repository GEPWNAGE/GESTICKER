import { History } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers, { State } from './reducers';

export default function configureStore(history: History) {
    const reducer = combineReducers<State>({
        ...reducers,
        router: routerReducer,
    });

    const middleware = [
        thunkMiddleware,
        routerMiddleware(history),
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore<State>(
        reducer,
        composeEnhancers(applyMiddleware(...middleware)),
    );
}
