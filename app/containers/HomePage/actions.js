import { SET_SELECTED_COUNTRY } from './constants';

export const setSelectedCountry = (country) => ({
  type: SET_SELECTED_COUNTRY,
  payload: country,
});
