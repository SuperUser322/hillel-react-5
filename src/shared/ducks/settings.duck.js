import { createSlice } from '@reduxjs/toolkit';

export const namespace = "settings";

const slice = createSlice({
  name: namespace,
  initialState: {
    isMobile: false,
    isMenuOpen: false,
  },
  reducers: {
    set: (state, action) => {
      let { payload } = action;
      let { ...rest } = payload;
      return {
        ...state,
        ...rest,
      };
    },
  },
});

export const { set } = slice.actions;

export function setMenuIsOpen(value) {
  return set({
    isMenuOpen: value,
  });
}

export function setIsMobile(value) {
  return set({
    isMobile: value,
  });
}

export const reducer = slice.reducer;

export const selectField = (s, key) => s[namespace][key];
export const selectIsMenuOpen = (s) => selectField(s, 'isMenuOpen');
export const selectIsMobile = (s) => selectField(s, 'isMobile');
