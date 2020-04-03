import { createSelector } from 'reselect';
import moment from 'moment';
import { trim } from 'lodash';

import { SCALE_METHOD_LOGARITHMIC } from 'components/Charts/Settings/constants';
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

const makeSummary = () =>
  createSelector(selectApplication, (application) => application.summary);

const makeShowDays = () =>
  createSelector(selectApplication, (application) => application.showDays);

const makeScaleMethod = () =>
  createSelector(selectApplication, (application) => application.scaleMethod);

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

const makeCountryDataReducedByDays = () =>
  createSelector(
    [makeCountryData(), makeShowDays()],
    (_countryData, showDays) => {
      // return the raw object if showDays is in the all state, either with "null" or "Infinity" as value
      if (!~~showDays) {
        return _countryData;
      }

      const countryData = { ..._countryData };
      const now = moment().unix();
      const then = moment().subtract(2, 'd').add(showDays, 'd').unix();

      Object.keys(countryData).forEach((status) => {
        countryData[status] = countryData[status].filter((entry) => {
          const entryTimestamp = moment(entry.Date).unix();

          return entryTimestamp <= now && entryTimestamp >= then;
        });
      });

      return countryData;
    },
  );

const makeCountryDataForLineChart = () =>
  createSelector(
    [
      makeCountryDataReducedByDays(),
      makeSelectedProvince(),
      makeSelectedCity(),
      makeScaleMethod(),
    ],
    (_countryData, selectedProvince, selectedCity, scaleMethod) => {
      const countryData = { ..._countryData };
      const statuses = Object.keys(countryData);
      let province = DEFAULT_PROVINCE;

      if (selectedProvince && selectedProvince !== DEFAULT_PROVINCE) {
        province = selectedProvince;
      }

      if (selectedCity && selectedCity !== DEFAULT_CITY) {
        province = selectedCity;
      }

      statuses.forEach((status) => {
        const entriesByDate = {};

        countryData[status].forEach((entry) => {
          if (entry.Province === province || province === DEFAULT_PROVINCE) {
            if (!entriesByDate[entry.Date]) {
              entriesByDate[entry.Date] = { ...entry };
            } else {
              entriesByDate[entry.Date].Cases += entry.Cases;
            }
          }
        });

        if (scaleMethod === SCALE_METHOD_LOGARITHMIC) {
          countryData[status].forEach((entry) => {
            entriesByDate[entry.Date].CasesOld =
              entriesByDate[entry.Date].Cases;
            entriesByDate[entry.Date].Cases = Math.max(
              Math.log(entriesByDate[entry.Date].Cases),
              0,
            );
          });
        }

        countryData[status] = Object.values(entriesByDate);
      });

      return (countryData[statuses[0]] || []).map((day, index) => {
        const dayOut = {
          name: moment(day.Date).format('l'),
        };

        statuses.forEach((status) => {
          dayOut[status] = countryData[status][index].Cases;
        });

        return dayOut;
      });
    },
  );

const makeCountryDataForTreemapChart = () =>
  createSelector([makeSummary()], (summary) => {
    if (!summary.Countries) {
      return undefined;
    }

    return [
      {
        name: '',
        children: summary.Countries.map((country) => ({
          name: `${trim(country.Country)}`,
          children: [
            {
              type: 'confirmed',
              cases: country.TotalConfirmed,
            },
            {
              type: 'deaths',
              cases: country.TotalDeaths,
            },
            {
              type: 'recovered',
              cases: country.TotalRecovered,
            },
          ],
        })),
      },
    ];
  });

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
  makeCountryDataForTreemapChart,
  makeProvinces,
  makeHasProvinces,
  makeProvinceCities,
  makeProvinceHasCities,
  makeShowDays,
  makeScaleMethod,
};
