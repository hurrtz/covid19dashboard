import {
  SET_SELECTED_COUNTRY,
  FETCH_COUNTRIES,
  SET_AVAILABLE_COUNTRIES,
  SET_COUNTRY_DATA,
  FETCH_COUNTRY_DATA,
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

export const fetchCountryData = () => ({ type: FETCH_COUNTRY_DATA });

export const setCountryData = (countryData) => ({
  type: SET_COUNTRY_DATA,
  payload: countryData,
});
