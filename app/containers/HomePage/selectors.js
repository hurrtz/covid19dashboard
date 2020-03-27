import { createSelector } from 'reselect';
import moment from 'moment';

import { initialState, DEFAULT_PROVINCE } from './reducer';

const selectApplication = (state) => state.application || initialState;

const makeSelectedCountry = () =>
  createSelector(
    selectApplication,
    (application) => application.selectedCountry,
  );

const makeSelectedProvince = () =>
  createSelector(
    selectApplication,
    (application) => application.selectedProvince,
  );

const makeSelectedChartType = () =>
  createSelector(
    selectApplication,
    (application) => application.selectedChartType,
  );

const makeAvailableCountries = () =>
  createSelector(
    selectApplication,
    (application) => application.availableCountries,
  );

const makeSelectedCountryObject = () =>
  createSelector(
    [makeSelectedCountry(), makeAvailableCountries()],
    (selectedCountry, availableCountries) =>
      availableCountries.filter(
        (country) => country.Country === selectedCountry,
      )[0] || {},
  );

const makeHasProvinces = () =>
  createSelector(
    makeSelectedCountryObject(),
    (country) => country && country.Provinces && country.Provinces.length > 1,
  );

const makeData = () =>
  createSelector(selectApplication, (application) => application.data);

const makeProvince = () =>
  createSelector(
    selectApplication,
    (application) => application.selectedProvince,
  );

const makeCountryData = () =>
  createSelector(
    [makeSelectedCountryObject(), makeData()],
    (selectedCountryObject, data) =>
      selectedCountryObject && data[selectedCountryObject.Country]
        ? data[selectedCountryObject.Country]
        : [],
  );

const makeCountryDataMappedForChart = () =>
  createSelector(
    [makeCountryData(), makeProvince()],
    (_countryData, selectedProvince) => {
      const countryData = { ..._countryData };
      const availableCategories = [];

      if (countryData.confirmed && countryData.confirmed.length) {
        availableCategories.push('confirmed');
      }

      if (countryData.deaths && countryData.deaths.length) {
        availableCategories.push('deaths');
      }

      if (countryData.recovered && countryData.recovered.length) {
        availableCategories.push('recovered');
      }

      availableCategories.forEach((category) => {
        const entriesByDate = {};

        countryData[category].forEach((entry) => {
          if (
            entry.Province === selectedProvince ||
            selectedProvince === DEFAULT_PROVINCE
          ) {
            if (!entriesByDate[entry.Date]) {
              entriesByDate[entry.Date] = { ...entry };
            } else {
              entriesByDate[entry.Date].Cases += entry.Cases;
            }
          }
        });

        countryData[category] = Object.values(entriesByDate);
      });

      return (countryData[availableCategories[0]] || []).map((day, index) => {
        const dayOut = {
          name: moment(day.Date).format('l'),
        };

        availableCategories.forEach((category) => {
          dayOut[category] = countryData[category][index].Cases;
        });

        return dayOut;
      });
    },
  );

export {
  selectApplication,
  makeSelectedCountry,
  makeSelectedProvince,
  makeSelectedChartType,
  makeAvailableCountries,
  makeSelectedCountryObject,
  makeCountryData,
  makeCountryDataMappedForChart,
  makeHasProvinces,
};
