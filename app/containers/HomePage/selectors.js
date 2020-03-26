import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApplication = (state) => state.application || initialState;

const makeSelectCountry = () =>
  createSelector(
    selectApplication,
    (application) => application.selectedCountry,
  );

export { selectApplication, makeSelectCountry };
