import { loadState } from './utils';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers/reducers';
import reduxThunk from 'redux-thunk';
import websocketMiddleware from './middleware/socketMiddleware';

const persistedState = loadState();
const middleware = [reduxThunk, websocketMiddleware];

const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(...middleware))
);

export default store;
