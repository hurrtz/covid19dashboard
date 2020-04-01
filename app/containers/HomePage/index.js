import React, { useEffect, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import { flow } from 'lodash';

import { Consumer as hasApplicationConsumer } from 'contexts/Application';
import Header from 'components/Header';
import LineChart from 'containers/Charts/Line';
import TreemapChart from 'containers/Charts/Treemap';
import ChartSettings from 'containers/Charts/Settings';
import { useInjectSaga } from 'utils/injectSaga';

import {
  makeSelectedProvince,
  makeSelectedCity,
  makeSelectedChartType,
  makeAvailableCountries,
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
import { CHART_TYPE_LINE_CHART, CHART_TYPE_TREEMAP_CHART } from './constants';
import { StyledPaper, StyledHeadline, SettingsWrapper } from './styles';

const key = 'APPLICATION';

const homePage = ({
  dimensions: { width, height },
  selectedCountry,
  selectedProvince,
  selectedCity,
  selectedChartType,
  handleFetchCountries,
  onFetchCountryData,
  onSetChartType,
  cities,
}) => {
  useInjectSaga({ key, saga });

  useEffect(() => {
    handleFetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry && selectedCountry.Country) {
      onFetchCountryData();
    }
  }, [selectedCountry]);

  const getHeight = () => height - 160;

  const getWidth = () => width - 48;

  const renderChart = () => {
    let chart;

    switch (selectedChartType) {
      case CHART_TYPE_LINE_CHART:
        chart = (
          <Fragment>
            <StyledHeadline
              country={selectedCountry.Country}
              province={selectedProvince}
              city={
                (cities.filter((city) => city.id === selectedCity)[0] || {})
                  .name
              }
            />

            <LineChart width={getWidth()} height={getHeight()} />

            <SettingsWrapper>
              <ChartSettings />
            </SettingsWrapper>
          </Fragment>
        );
        break;

      case CHART_TYPE_TREEMAP_CHART:
        chart = (
          <TreemapChart
            width={getWidth()}
            height={Math.max(getHeight(), 1000)}
          />
        );
        break;

      default:
    }

    return <StyledPaper>{chart}</StyledPaper>;
  };

  return (
    <Fragment>
      <Header
        chartType={selectedChartType}
        handleChangeChartType={onSetChartType}
      />
      <Grid container spacing={4}>
        <Grid item />
      </Grid>
      <Grid container direction="column" spacing={4}>
        <Grid item>{renderChart()}</Grid>
      </Grid>
    </Fragment>
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
  dimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
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

export default flow([
  connect(mapStateToProps, mapDispatchToProps),
  hasApplicationConsumer,
])(homePage);
