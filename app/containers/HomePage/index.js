import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  FormControl,
  NativeSelect,
  FormHelperText,
  RootRef,
  Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import LineChart from 'components/Charts/Line';
import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectedProvince,
  makeSelectedChartType,
  makeAvailableCountries,
  makeCountryDataMappedForChart,
  makeHasProvinces,
  makeSelectedCountryObject,
} from './selectors';
import {
  setSelectedCountry,
  setSelectedProvince,
  fetchCountries,
  fetchCountryData,
  setChartType,
} from './actions';
import saga from './saga';

const key = 'APPLICATION';

const homePage = ({
  selectedCountry,
  selectedProvince,
  selectedChartType,
  availableCountries,
  onSetSelectedCountry,
  onSetSelectedProvince,
  handleFetchCountries,
  onFetchCountryData,
  onSetChartType,
  data,
  hasProvinces,
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
                <FormHelperText>select your country</FormHelperText>
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
                    <option value="all">all</option>
                    {selectedCountry.Provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>select your province</FormHelperText>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Grid>
        {data && (
          <Grid item>
            <Paper elevation={3}>
              <LineChart width={width} height={height} data={data} />
            </Paper>
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
  handleFetchCountries: PropTypes.func.isRequired,
  onFetchCountryData: PropTypes.func.isRequired,
  onSetChartType: PropTypes.func.isRequired,
  hasProvinces: PropTypes.bool.isRequired,
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
    makeSelectedChartType(),
    makeAvailableCountries(),
    makeHasProvinces(),
    makeCountryDataMappedForChart(),
  ],
  (
    selectedCountry,
    selectedProvince,
    selectedChartType,
    availableCountries,
    hasProvinces,
    data,
  ) => ({
    selectedCountry,
    selectedProvince,
    selectedChartType,
    availableCountries,
    hasProvinces,
    data,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  onSetSelectedCountry: (selectedCountry) =>
    dispatch(setSelectedCountry(selectedCountry)),
  onSetSelectedProvince: (selectedProvince) =>
    dispatch(setSelectedProvince(selectedProvince)),
  onSetChartType: (chartType) => dispatch(setChartType(chartType)),
  handleFetchCountries: () => dispatch(fetchCountries()),
  onFetchCountryData: () => dispatch(fetchCountryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
