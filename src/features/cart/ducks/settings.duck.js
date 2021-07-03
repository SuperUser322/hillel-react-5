import { produce } from "immer";

// duck namespace
export const namespace = "cart/settings";

// action types
export const ADD_ITEM = `${namespace}/ADD_ITEM`;
export const UPDATE_ITEM = `${namespace}/UPDATE_ITEM`;
export const REMOVE_ITEM = `${namespace}/REMOVE_ITEM`;
export const SET_FIELD = `${namespace}/SET_FIELD`;
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
export function reducer(state = initialState, action) {
  let { type, id, item, key, value } = action;
  console.log(state);
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
      return produce(state, s => {
        s[key] = value;
      });

    default:
      return state;
  }


}

// selectors
export const selectItems = state => state[namespace].items;
export const selectTotalPrice = state => state[namespace].totalPrice;