import { combineReducers, createStore } from 'redux';

import reducers, { State } from './reducers';

export default function configureStore() {
    const reducer = combineReducers<State>(reducers);

    return createStore<State>(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
}
