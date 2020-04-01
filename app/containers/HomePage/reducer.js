/* eslint-disable no-param-reassign */
import produce from 'immer';
import store from 'store';

import './initializeStoreData';

import {
  SET_SELECTED_COUNTRY,
  SET_SELECTED_PROVINCE,
  SET_SELECTED_CITY,
  SET_AVAILABLE_COUNTRIES,
  SET_COUNTRY_DATA,
  SET_CHART_TYPE,
  DEFAULT_PROVINCE,
  DEFAULT_CITY,
  SET_SUMMARY,
} from './constants';

export const initialState = {
  chartType: store.get('chartType'),
  country: store.get('country'),
  province: store.get('province'),
  city: store.get('city'),
  availableCountries: store.get('countries'),
  data: {},
  summary: {},
};

const applicationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SELECTED_COUNTRY:
        draft.country = action.payload;
        draft.province = DEFAULT_PROVINCE;
        draft.city = DEFAULT_CITY;
        store.set('country', action.payload);
        store.set('province', DEFAULT_PROVINCE);
        store.set('city', DEFAULT_CITY);
        break;

      case SET_SELECTED_PROVINCE:
        draft.province = action.payload;
        draft.city = DEFAULT_CITY;
        store.set('province', action.payload);
        store.set('city', DEFAULT_CITY);
        break;

      case SET_SELECTED_CITY:
        draft.city = action.payload;
        store.set('city', action.payload);
        break;

      case SET_CHART_TYPE:
        draft.chartType = action.payload;
        store.set('chartType', action.payload);
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

      case SET_SUMMARY:
        draft.summary = action.payload;
        break;

      default:
    }
  });

export default applicationReducer;
