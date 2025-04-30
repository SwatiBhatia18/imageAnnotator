import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import anotator_details from "./annotator_details/reducer";


const persistConfig = {
  key: "root",  
  storage, 
  whitelist: ["anotator_details"], 
  
};

const rootReducer = combineReducers({
  anotator_details,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
