/* eslint-disable no-param-reassign */
import produce from 'immer';

import { SET_SELECTED_COUNTRY } from './constants';

export const initialState = {
  selectedCountry: 'en',
};

const applicationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SELECTED_COUNTRY:
        draft.selectedCountry = action.payload;
        break;

      default:
    }
  });

export default applicationReducer;
