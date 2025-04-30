import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'; 
import rootReducer from '../redux/rootReducer';
import loggerMiddleware from './loggerMiddleware';

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

const persistor = persistStore(store); 

export { store, persistor }; 
