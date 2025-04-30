import { createStore , applyMiddleware} from 'redux';
import rootReducer from '../redux/rootReducer';
import loggerMiddleware from './loggerMiddleware';

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));

export default store;