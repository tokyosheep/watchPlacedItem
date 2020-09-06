import {combineReducers,createStore} from "redux";
import {WatchedTypes,ModeSwitch,Options,watchFlag} from "../reduce/index";

const rootReducer = combineReducers({
    WatchedTypes,
    ModeSwitch,
    Options,
    watchFlag
})

const configStore = () =>{
    const store = createStore(rootReducer);
    return store;
}

export default configStore;