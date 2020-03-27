import {
  SET_SELECTED_COUNTRY,
  SET_SELECTED_PROVINCE,
  FETCH_COUNTRIES,
  SET_AVAILABLE_COUNTRIES,
  SET_COUNTRY_DATA,
  FETCH_COUNTRY_DATA,
} from './constants';

export const setSelectedCountry = (country) => ({
  type: SET_SELECTED_COUNTRY,
  payload: country,
});

export const setSelectedProvince = (province) => ({
  type: SET_SELECTED_PROVINCE,
  payload: province,
});

export const fetchCountries = () => ({ type: FETCH_COUNTRIES });

export const setAvailableCountries = (countries) => ({
  type: SET_AVAILABLE_COUNTRIES,
  payload: countries,
});

export const fetchCountryData = () => ({ type: FETCH_COUNTRY_DATA });

export const setCountryData = (category, data) => ({
  type: SET_COUNTRY_DATA,
  payload: { category, data },
});
