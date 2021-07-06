import { createStore as _createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import thunk from 'redux-thunk';
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
  let middleware = [thunk, sagaMiddleware];

  const middlewareEnhancer = applyMiddleware(...middleware);
  const composedEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  )(middlewareEnhancer);

  const store = _createStore(combineReducers(reducers), undefined, composedEnhancers);

  sagaMiddleware.run(function* () {
    yield all(sagas.map(s => s()));
  });

  return store;
}

// create the store
export const store = createStore();
