import {
  SET_SELECTED_COUNTRY,
  SET_SELECTED_PROVINCE,
  SET_SELECTED_CITY,
  FETCH_COUNTRIES,
  SET_AVAILABLE_COUNTRIES,
  SET_COUNTRY_DATA,
  FETCH_COUNTRY_DATA,
  SET_CHART_TYPE,
  FETCH_SUMMARY,
  SET_SUMMARY,
  SET_SHOW_DAYS,
  SET_SCALE_METHOD,
} from './constants';

export const setSelectedCountry = (country) => ({
  type: SET_SELECTED_COUNTRY,
  payload: country,
});

export const setSelectedProvince = (province) => ({
  type: SET_SELECTED_PROVINCE,
  payload: province,
});

export const setSelectedCity = (city) => ({
  type: SET_SELECTED_CITY,
  payload: city,
});

export const fetchCountries = () => ({ type: FETCH_COUNTRIES });

export const fetchSummary = () => ({ type: FETCH_SUMMARY });

export const setSummary = (summary) => ({
  type: SET_SUMMARY,
  payload: summary,
});

export const setShowDays = (showDays) => ({
  type: SET_SHOW_DAYS,
  payload: showDays,
});

export const setScaleMethod = (scaleMethod) => ({
  type: SET_SCALE_METHOD,
  payload: scaleMethod,
});

export const setAvailableCountries = (countries) => ({
  type: SET_AVAILABLE_COUNTRIES,
  payload: countries,
});

export const fetchCountryData = () => ({ type: FETCH_COUNTRY_DATA });

export const setCountryData = (category, data) => ({
  type: SET_COUNTRY_DATA,
  payload: { category, data },
});

export const setChartType = (chartType) => ({
  type: SET_CHART_TYPE,
  payload: chartType,
});
