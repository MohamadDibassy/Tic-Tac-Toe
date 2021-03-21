import { createStore } from "redux";
const { createstore } = Redux;

const inState = {
  spaces: []
};

function myreducer(state = inState, action) {
  if (action.type == "ADD_X") {
    return {
      ...state,
      spaces: [...state.spaces, action.X_TEXT]
    };
  }
  if (action.type == "ADD_O") {
    return {
      ...state,
      spaces: [...state.spaces, action.O_TEXT]
    };
  }
  if (action.type == "ADD_NULL") {
    return {
      ...state,
      spaces: [...state.spaces, action.NULL_TEXT]
    };
  }
}
const store = createStore(myreducer);

store.subscribe(() => {
  console.log("state updated");
  console.log(store.getState());
});

store.dispatch({ type: "ADD_X", X_TEXT: "X" });
store.dispatch({ type: "ADD_O", O_TEXT: "O" });
Store.dispatch({ type: "ADD_NULL", NULL_TEXT: "null" });
