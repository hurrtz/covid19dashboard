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
  createSelector(makeCountryData(), (countryData) => {
    const availableCategories = [];

    console.log(countryData);

    if (!countryData || !Object.keys(countryData).length) {
      return undefined;
    }

    if (countryData.confirmed && countryData.confirmed.length) {
      availableCategories.push('confirmed');
    }

    if (countryData.deaths && countryData.deaths.length) {
      availableCategories.push('deaths');
    }

    if (countryData.recovered && countryData.recovered.length) {
      availableCategories.push('recovered');
    }

    return countryData[availableCategories[0]].map((day, index) => {
      const dayOut = {
        name: moment(day.Date).format('l'),
      };

      availableCategories.forEach((category) => {
        dayOut[category] = countryData[category][index].Cases;
      });

      return dayOut;
    });
  });

export {
  selectApplication,
  makeSelectCountry,
  makeAvailableCountries,
  makeSelectedCountryObject,
  makeCountryData,
  makeMappedCountryData,
};
