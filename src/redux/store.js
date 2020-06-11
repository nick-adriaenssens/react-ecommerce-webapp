import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root.saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
