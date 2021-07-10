import { createSlice } from "@reduxjs/toolkit";
import { takeEvery, put, call } from 'redux-saga/effects';

export const NAMESPACE = 'productsBySagaLive';

const slice = createSlice({
  name: NAMESPACE,
  initialState: {
    isOpen: false,
    isLoading: false,
    data: null,
    error: null,
  },
  reducers: {
    loadStart: (state, action) => {
      state.isLoading = true;
    },
    loadEnd: (state, action) => {
      let { payload: { data = [], error = null } } = action;
      state.isLoading = false;
      state.data = data;
      state.error = error;
    },
    load: (s, a) => {},
    setIsOpen: (s, a) => {
      s.isOpen = a.payload.value;
    }
  },
});

export const { loadStart, loadEnd, setIsOpen, load } = slice.actions;

export const loadOld = () => {
  return async (dispatch) => {
    dispatch(loadStart());

    let error = null,
      data = [];

    try {
      let response = await fetch("https://60e4720a5bcbca001749e9e1.mockapi.io/products");
      data = await response.json();
    } catch (e) {
      error = e.message;
    }

    dispatch(loadEnd({
      data,
      error,
    }));
  };
};

const reducer = slice.reducer;
export default reducer;

export const selectIsLoading = (s) => s[NAMESPACE].isLoading;
export const selectData = (s) => s[NAMESPACE].data;
export const selectError = (s) => s[NAMESPACE].error;
export const selectIsOpen = (s) => s[NAMESPACE].isOpen;

function* loadDataSaga() {
  yield put(loadStart());

  let error = null,
    data = [];

  try {
    let response = yield call(fetch, "https://60e4720a5bcbca001749e9e1.mockapi.io/products");
    data = yield call(() => response.json());
  } catch (e) {
    error = e.message;
  }

  yield put(loadEnd({
    data,
    error,
  }));
}

export function* saga() {
  //console.log('----------------- saga started');
  yield takeEvery(load, loadDataSaga);
  /*yield takeEvery(setIsOpen, function* (action) {/////////////////////////////////////
    console.log('----------------- saga has received an action', action);
  });*/
}
*/
