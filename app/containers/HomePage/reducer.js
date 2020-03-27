/* eslint-disable no-param-reassign */
import produce from 'immer';

import {
  SET_SELECTED_COUNTRY,
  SET_AVAILABLE_COUNTRIES,
  SET_COUNTRY_DATA,
} from './constants';

export const initialState = {
  selectedCountry: '',
  availableCountries: [],
  data: {},
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

      case SET_COUNTRY_DATA:
        if (!draft.data[state.selectedCountry]) {
          draft.data[state.selectedCountry] = {};
        }

        draft.data[state.selectedCountry][action.payload.category] =
          action.payload.data;
        break;

      default:
    }
  });

export default applicationReducer;
