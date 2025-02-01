import { createStore } from "redux";
import emotionReducer from "./reducers/emotionReducer";

const store = createStore(emotionReducer);

export default store;


