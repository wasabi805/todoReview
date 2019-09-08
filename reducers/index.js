//export reducers from here

import { combineReducers } from 'redux'
import productsReducer from './products';

const product = combineReducers({
    productsReducer
});

export default product
