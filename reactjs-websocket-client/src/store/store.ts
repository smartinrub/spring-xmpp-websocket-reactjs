import { loadState } from './utils';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/reducers';
import reduxThunk from 'redux-thunk';
import websocketMiddleware from './middleware/socketMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistedState = loadState();
const middleware = [reduxThunk, websocketMiddleware];

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
