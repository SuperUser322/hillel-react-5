import { produce } from "immer";

// duck namespace
export const NAMESPACE = "cart/settings";

// action types
export const ADD_ITEM = `${NAMESPACE}/ADD_ITEM`;
export const UPDATE_ITEM = `${NAMESPACE}/UPDATE_ITEM`;
export const REMOVE_ITEM = `${NAMESPACE}/REMOVE_ITEM`;
export const SET_FIELD = `${NAMESPACE}/SET_FIELD`;
// action creators
export function addItem(item) {
  return {
    type: ADD_ITEM,
    item,
  }
}

export function updateItem(id, item) {
  return {
    type: UPDATE_ITEM,
    id,
    item,
  }
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id,
  }
}

export function setField(key, value) {
  return {
    type: SET_FIELD,
    key,
    value,
  }
}

// initial state
const initialState = {
  items: [],
};

//const reducerReactionsMap = {
  //[ADD_ITEM]: (state, action) => state,
//};

// reducer
export default function reducer(state = initialState, action) {
  let { type, id, item, key, value } = action;

  switch (type) {
    case ADD_ITEM:
      return produce(state, (s) => {
        s.items.push(item);
      });

    case UPDATE_ITEM:
      return produce(state, (s) => {
        let index = s.items.findIndex(el => el.id === id);
        if (index > -1) {
          s.items[index] = {
            ...s.items[index],
            ...item,
          };
        }
      });

    case REMOVE_ITEM:
      return produce(state, (s) => {
        let index = s.items.findIndex(el => el.id === id);
        if (index > -1) {
          s.items.splice(index, 1);
        }
      });

    case SET_FIELD:
      return produce(state, (s) => {
        s[key] = value;
      });

    default:
      return state;
  }


}

// selectors
export const selectItems = state => state[NAMESPACE].items;
