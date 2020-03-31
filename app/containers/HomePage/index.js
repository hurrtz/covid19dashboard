import React, { useEffect, useState, useRef } from 'react';
import { Grid, RootRef } from '@material-ui/core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import LineChart from 'components/Charts/Line';
import ChartSettings from 'containers/Chart/Settings';
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
import { StyledPaper, StyledHeadline, SettingsWrapper } from './styles';

const key = 'APPLICATION';

const homePage = ({
  selectedCountry,
  selectedProvince,
  selectedCity,
  selectedChartType,
  handleFetchCountries,
  onFetchCountryData,
  onSetChartType,
  cities,
  data,
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

  const renderChart = () => (
    <StyledPaper elevation={3}>
      <StyledHeadline
        country={selectedCountry.Country}
        province={selectedProvince}
        city={(cities.filter((city) => city.id === selectedCity)[0] || {}).name}
      />

      <LineChart width={width} height={height} data={data} />

      <SettingsWrapper>
        <ChartSettings />
      </SettingsWrapper>
    </StyledPaper>
  );

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
        {data && <Grid item>{renderChart()}</Grid>}
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
  handleFetchCountries: PropTypes.func.isRequired,
  onFetchCountryData: PropTypes.func.isRequired,
  onSetChartType: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ).isRequired,
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
