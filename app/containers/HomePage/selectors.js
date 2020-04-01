import { createSelector } from 'reselect';
import moment from 'moment';
import { trim } from 'lodash';

import { DEFAULT_PROVINCE, DEFAULT_CITY } from './constants';
import { initialState } from './reducer';

const selectApplication = (state) => state.application || initialState;

const makeSelectedCountry = () =>
  createSelector(selectApplication, (application) => application.country);

const makeSelectedProvince = () =>
  createSelector(selectApplication, (application) => application.province);

const makeSelectedCity = () =>
  createSelector(selectApplication, (application) => application.city);

const makeSelectedChartType = () =>
  createSelector(selectApplication, (application) => application.chartType);

const makeAvailableCountries = () =>
  createSelector(
    selectApplication,
    (application) => application.availableCountries || [],
  );

const makeSelectedCountryObject = () =>
  createSelector(
    [makeSelectedCountry(), makeAvailableCountries()],
    (selectedCountry, availableCountries) =>
      availableCountries.filter(
        (country) => country.Country === selectedCountry,
      )[0] || {},
  );

const makeProvinces = () =>
  createSelector(makeSelectedCountryObject(), (country) =>
    (country.Provinces || [])
      .filter((province) => province && province.indexOf(',') <= 0)
      .sort(),
  );

const makeAllProvinces = () =>
  createSelector(makeSelectedCountryObject(), (country) =>
    [...(country.Provinces || [])].sort(),
  );

const makeHasProvinces = () =>
  createSelector(
    makeProvinces(),
    (provinces) => provinces && provinces.length > 0,
  );

const makeData = () =>
  createSelector(selectApplication, (application) => application.data);

const makeProvinceCities = () =>
  createSelector(
    [makeAllProvinces(), makeSelectedProvince()],
    (allProvinces, selectedProvince) =>
      allProvinces
        .filter(
          (province) =>
            province.indexOf(selectedProvince) === 0 &&
            province !== selectedProvince,
        )
        .map((city) => ({ id: city, name: trim(city.split(',')[1]) })),
  );

const makeProvinceHasCities = () =>
  createSelector([makeProvinceCities()], (cities) => cities.length > 1);

const makeCountryData = () =>
  createSelector(
    [makeSelectedCountryObject(), makeData()],
    (selectedCountryObject, data) =>
      selectedCountryObject && data[selectedCountryObject.Country]
        ? data[selectedCountryObject.Country]
        : [],
  );

const makeCountryDataForLineChart = () =>
  createSelector(
    [makeCountryData(), makeSelectedProvince(), makeSelectedCity()],
    (_countryData, selectedProvince, selectedCity) => {
      const countryData = { ..._countryData };
      const availableCategories = [];

      let province = DEFAULT_PROVINCE;

      if (selectedProvince && selectedProvince !== DEFAULT_PROVINCE) {
        province = selectedProvince;
      }

      if (selectedCity && selectedCity !== DEFAULT_CITY) {
        province = selectedCity;
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

      availableCategories.forEach((category) => {
        const entriesByDate = {};

        countryData[category].forEach((entry) => {
          if (entry.Province === province || province === DEFAULT_PROVINCE) {
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
  makeSelectedCity,
  makeSelectedChartType,
  makeAvailableCountries,
  makeSelectedCountryObject,
  makeCountryData,
  makeCountryDataForLineChart,
  makeProvinces,
  makeHasProvinces,
  makeProvinceCities,
  makeProvinceHasCities,
};
