import {
  SET_SELECTED_COUNTRY,
  FETCH_COUNTRIES,
  SET_AVAILABLE_COUNTRIES,
} from './constants';

export const setSelectedCountry = (country) => ({
  type: SET_SELECTED_COUNTRY,
  payload: country,
});

export const fetchCountries = () => ({ type: FETCH_COUNTRIES });

export const setAvailableCountries = (countries) => ({
  type: SET_AVAILABLE_COUNTRIES,
  payload: countries,
});
