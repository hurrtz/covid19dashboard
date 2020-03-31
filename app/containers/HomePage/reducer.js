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
  DEFAULT_COUNTRY,
  DEFAULT_PROVINCE,
  DEFAULT_CITY,
} from './constants';

export const DEFAULT_CHART_TYPE = CHART_TYPE_LINE_CHART;

export const initialState = {
  chartType: DEFAULT_CHART_TYPE,
  country: DEFAULT_COUNTRY,
  province: DEFAULT_PROVINCE,
  city: DEFAULT_CITY,
  availableCountries: store.get('countries'),
  data: {},
};

const applicationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SELECTED_COUNTRY:
        draft.country = action.payload;
        draft.province = DEFAULT_PROVINCE;
        draft.city = DEFAULT_CITY;
        break;

      case SET_SELECTED_PROVINCE:
        draft.province = action.payload;
        draft.city = DEFAULT_CITY;
        break;

      case SET_SELECTED_CITY:
        draft.city = action.payload;
        break;

      case SET_CHART_TYPE:
        draft.chartType = action.payload;
        break;

      case SET_AVAILABLE_COUNTRIES:
        draft.availableCountries = action.payload;
        break;

      case SET_COUNTRY_DATA:
        if (!draft.data[state.country]) {
          draft.data[state.country] = {};
        }

        draft.data[state.country][action.payload.category] =
          action.payload.data;
        break;

      default:
    }
  });

export default applicationReducer;
