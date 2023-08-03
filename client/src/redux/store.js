import {createStore, applyMiddleware, compose} from "redux";
import reducer from "../redux/reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))
)

export default store;