import { createSelector } from 'reselect';
import moment from 'moment';

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

const makeSelectedCountryObject = () =>
  createSelector(
    [makeSelectCountry(), makeAvailableCountries()],
    (selectedCountry, availableCountries) =>
      availableCountries.filter(
        (country) => country.Country === selectedCountry,
      )[0] || undefined,
  );

const makeData = () =>
  createSelector(selectApplication, (application) => application.data);

const makeCountryData = () =>
  createSelector(
    [makeSelectedCountryObject(), makeData()],
    (selectedCountryObject, data) =>
      selectedCountryObject && data[selectedCountryObject.Country]
        ? data[selectedCountryObject.Country]
        : [],
  );

const makeMappedCountryData = () =>
  createSelector(makeCountryData(), (countryData) =>
    countryData.map((day) => ({
      name: moment(day.Date).format('l'),
      confirmed: day.Cases,
    })),
  );

export {
  selectApplication,
  makeSelectCountry,
  makeAvailableCountries,
  makeSelectedCountryObject,
  makeCountryData,
  makeMappedCountryData,
};
