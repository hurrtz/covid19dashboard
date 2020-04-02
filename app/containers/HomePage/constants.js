import { SHOW_DAYS_LAST_7_DAYS } from 'components/Charts/Settings/constants';

export const HANDLE_CHANGE_SELECTED_COUNTRY = 'HANDLE_CHANGE_SELECTED_COUNTRY';
export const SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY';
export const SET_SELECTED_PROVINCE = 'SET_SELECTED_PROVINCE';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const SET_AVAILABLE_COUNTRIES = 'SET_AVAILABLE_COUNTRIES';
export const FETCH_COUNTRY_DATA = 'FETCH_COUNTRY_DATA';
export const SET_COUNTRY_DATA = 'SET_COUNTRY_DATA';
export const SET_CHART_TYPE = 'SET_CHART_TYPE';
export const FETCH_SUMMARY = 'FETCH_SUMMARY';
export const SET_SUMMARY = 'SET_SUMMARY';
export const SET_SHOW_DAYS = 'SET_SHOW_DAYS';

export const DEFAULT_COUNTRY = 'Germany';
export const DEFAULT_PROVINCE = 'ALL';
export const DEFAULT_CITY = 'ALL';
export const DEFAULT_SHOW_DAYS = SHOW_DAYS_LAST_7_DAYS;

export const CHART_TYPE_LINE_CHART = 'LINE_CHART';
export const CHART_TYPE_MAP_CHART = 'MAP_CHART';
export const CHART_TYPE_TREEMAP_CHART = 'TREEMAP_CHART';

export const API = 'https://api.covid19api.com';
export const FETCH_COUNTRIES_URL = `${API}/countries`;
export const FETCH_SUMMARY_URL = `${API}/summary`;
