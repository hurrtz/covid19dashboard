/* eslint-disable no-param-reassign */
import produce from 'immer';

import { SET_SELECTED_COUNTRY, SET_AVAILABLE_COUNTRIES } from './constants';

export const initialState = {
  selectedCountry: 'en',
  availableCountries: [],
};

const applicationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SELECTED_COUNTRY:
        draft.selectedCountry = action.payload;
        break;

      case SET_AVAILABLE_COUNTRIES:
        draft.availableCountries = action.payload;
        break;

      default:
    }
  });

export default applicationReducer;
