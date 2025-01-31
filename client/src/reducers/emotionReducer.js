import { SET_HEADER, SET_LINKS } from "../actions/actionTypes";

const initialState = {
  header: "",
  links: [],
};

const emotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.payload };
    case SET_LINKS:
      return { ...state, links: action.payload };
    default:
      return state;
  }
};

export default emotionReducer;
