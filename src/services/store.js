import { createStore as _createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import thunk from 'redux-thunk';
import { routerMiddleware as createRouterMiddleware, connectRouter } from 'connected-react-router';
import history from './history';
import { ducks } from "../ducks";

// grab all reducers together
const reducers = {};
ducks.forEach(d => reducers[d.NAMESPACE] = d.default);

// grab all sagas together
const sagas = [];
ducks.forEach(d => {
  if (d.saga) sagas.push(d.saga);
});

// create store function
export function createStore() {
  let sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history)
  let middleware = [thunk, routerMiddleware, sagaMiddleware, routerMiddleware];

  const middlewareEnhancer = applyMiddleware(...middleware);
  const composedEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  )(middlewareEnhancer);

  const store = _createStore(combineReducers({
    router: connectRouter(history),
    ...reducers,
  }), undefined, composedEnhancers);

  sagaMiddleware.run(function* () {
    yield all(sagas.map(s => s()));
  });

  return store;
}

// create the store
export const store = createStore();
