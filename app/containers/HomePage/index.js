import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  FormControl,
  NativeSelect,
  FormHelperText,
  RootRef,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import LineChart from 'components/Charts/Line';
import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectedProvince,
  makeSelectedCity,
  makeSelectedChartType,
  makeAvailableCountries,
  makeCountryDataMappedForChart,
  makeProvinces,
  makeHasProvinces,
  makeProvinceCities,
  makeSelectedCountryObject,
  makeProvinceHasCities,
} from './selectors';
import {
  setSelectedCountry,
  setSelectedProvince,
  setSelectedCity,
  fetchCountries,
  fetchCountryData,
  setChartType,
} from './actions';
import saga from './saga';
import { DEFAULT_CITY, DEFAULT_PROVINCE } from './constants';
import { StyledPaper } from './styles';

const key = 'APPLICATION';

const homePage = ({
  selectedCountry,
  selectedProvince,
  selectedCity,
  selectedChartType,
  availableCountries,
  onSetSelectedCountry,
  onSetSelectedProvince,
  onSetSelectedCity,
  handleFetchCountries,
  onFetchCountryData,
  onSetChartType,
  data,
  provinces,
  hasProvinces,
  cities,
  hasCities,
}) => {
  const rootRef = useRef();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useInjectSaga({ key, saga });

  useEffect(() => {
    handleFetchCountries();

    setWidth(rootRef.current.clientWidth);
    setHeight(rootRef.current.parentNode.parentNode.clientHeight - 104 - 86);
  }, []);

  useEffect(() => {
    if (selectedCountry && selectedCountry.Country) {
      onFetchCountryData();
    }
  }, [selectedCountry]);

  return (
    <RootRef rootRef={rootRef}>
      <Header
        chartType={selectedChartType}
        handleChangeChartType={onSetChartType}
      />
      <Grid container spacing={4}>
        <Grid item />
      </Grid>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Grid container spacing={4}>
            <Grid item>
              <FormControl>
                <NativeSelect
                  value={selectedCountry.Country}
                  onChange={(event) => onSetSelectedCountry(event.target.value)}
                >
                  {availableCountries.map((country) => (
                    <option key={country.Country} value={country.Country}>
                      {country.Country}
                    </option>
                  ))}
                </NativeSelect>
                <FormHelperText>Country</FormHelperText>
              </FormControl>
            </Grid>
            {hasProvinces && (
              <Grid item>
                <FormControl>
                  <NativeSelect
                    value={selectedProvince}
                    onChange={(event) =>
                      onSetSelectedProvince(event.target.value)
                    }
                  >
                    <option value={DEFAULT_PROVINCE}>all</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>Province</FormHelperText>
                </FormControl>
              </Grid>
            )}
            {hasCities && (
              <Grid item>
                <FormControl>
                  <NativeSelect
                    value={selectedCity}
                    onChange={(event) => onSetSelectedCity(event.target.value)}
                  >
                    <option value={DEFAULT_CITY}>all</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>City</FormHelperText>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Grid>
        {data && (
          <Grid item>
            <StyledPaper elevation={3}>
              <LineChart width={width} height={height} data={data} />
            </StyledPaper>
          </Grid>
        )}
      </Grid>
    </RootRef>
  );
};

homePage.propTypes = {
  selectedCountry: PropTypes.PropTypes.shape({
    Country: PropTypes.string,
    Provinces: PropTypes.arrayOf(PropTypes.string),
    Lat: PropTypes.number,
    Lon: PropTypes.number,
    Date: PropTypes.string,
    Cases: PropTypes.number,
    Status: PropTypes.string,
  }).isRequired,
  selectedProvince: PropTypes.string.isRequired,
  selectedCity: PropTypes.string.isRequired,
  selectedChartType: PropTypes.string.isRequired,
  availableCountries: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.string,
      Slug: PropTypes.string,
      Provinces: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  onSetSelectedCountry: PropTypes.func.isRequired,
  onSetSelectedProvince: PropTypes.func.isRequired,
  onSetSelectedCity: PropTypes.func.isRequired,
  handleFetchCountries: PropTypes.func.isRequired,
  onFetchCountryData: PropTypes.func.isRequired,
  onSetChartType: PropTypes.func.isRequired,
  provinces: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasProvinces: PropTypes.bool.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasCities: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.string,
      Province: PropTypes.string,
      Lat: PropTypes.number,
      Lon: PropTypes.number,
      Date: PropTypes.string,
      Cases: PropTypes.number,
      Status: PropTypes.string,
    }),
  ),
};

const mapStateToProps = createSelector(
  [
    makeSelectedCountryObject(),
    makeSelectedProvince(),
    makeSelectedCity(),
    makeSelectedChartType(),
    makeAvailableCountries(),
    makeProvinces(),
    makeHasProvinces(),
    makeProvinceCities(),
    makeProvinceHasCities(),
    makeCountryDataMappedForChart(),
  ],
  (
    selectedCountry,
    selectedProvince,
    selectedCity,
    selectedChartType,
    availableCountries,
    provinces,
    hasProvinces,
    cities,
    hasCities,
    data,
  ) => ({
    selectedCountry,
    selectedProvince,
    selectedCity,
    selectedChartType,
    availableCountries,
    provinces,
    hasProvinces,
    cities,
    hasCities,
    data,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  onSetSelectedCountry: (selectedCountry) =>
    dispatch(setSelectedCountry(selectedCountry)),
  onSetSelectedProvince: (selectedProvince) =>
    dispatch(setSelectedProvince(selectedProvince)),
  onSetSelectedCity: (selectedCity) => dispatch(setSelectedCity(selectedCity)),
  onSetChartType: (chartType) => dispatch(setChartType(chartType)),
  handleFetchCountries: () => dispatch(fetchCountries()),
  onFetchCountryData: () => dispatch(fetchCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
