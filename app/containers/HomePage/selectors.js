import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApplication = (state) => state.application || initialState;

const makeSelectCountry = () =>
  createSelector(
    selectApplication,
    (application) => application.selectedCountry,
  );

const makeAvailableCountries = () =>
  createSelector(
    selectApplication,
    (application) => application.availableCountries,
  );

export { selectApplication, makeSelectCountry, makeAvailableCountries };
