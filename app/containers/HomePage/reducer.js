/* eslint-disable no-param-reassign */
import produce from 'immer';
import store from 'store';

import {
  SET_SELECTED_COUNTRY,
  SET_SELECTED_PROVINCE,
  SET_SELECTED_CITY,
  SET_AVAILABLE_COUNTRIES,
  SET_COUNTRY_DATA,
  SET_CHART_TYPE,
  CHART_TYPE_LINE_CHART,
} from './constants';

export const DEFAULT_PROVINCE = 'ALL';
export const DEFAULT_CITY = 'ALL';
export const DEFAULT_CHART_TYPE = CHART_TYPE_LINE_CHART;

export const initialState = {
  selectedChartType: DEFAULT_CHART_TYPE,
  selectedCountry: '',
  selectedProvince: DEFAULT_PROVINCE,
  selectedCity: DEFAULT_CITY,
  availableCountries: store.get('countries'),
  data: {},
};

const applicationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SELECTED_COUNTRY:
        draft.selectedCountry = action.payload;
        draft.selectedProvince = DEFAULT_PROVINCE;
        draft.selectedCity = DEFAULT_CITY;
        break;

      case SET_SELECTED_PROVINCE:
        draft.selectedProvince = action.payload;
        draft.selectedCity = DEFAULT_CITY;
        break;

      case SET_SELECTED_CITY:
        draft.selectedCity = action.payload;
        break;

      case SET_CHART_TYPE:
        draft.selectedChartType = action.payload;
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
