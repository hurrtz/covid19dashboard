import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  makeSelectedCountryObject,
  makeAvailableCountries,
  makeSelectedProvince,
  makeProvinces,
  makeHasProvinces,
  makeSelectedCity,
  makeProvinceCities,
  makeProvinceHasCities,
} from 'containers/HomePage/selectors';
import {
  setSelectedCountry,
  setSelectedProvince,
  setSelectedCity,
} from 'containers/HomePage/actions';

import ChartSettingsComponent from 'components/Charts/Settings';

const ChartSettings = (props) => <ChartSettingsComponent {...props} />;

ChartSettings.propTypes = {
  availableCountries: PropTypes.arrayOf(
    PropTypes.shape({
      Country: PropTypes.string,
      Slug: PropTypes.string,
      Provinces: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
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
  provinces: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasProvinces: PropTypes.bool.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ).isRequired,
  hasCities: PropTypes.bool.isRequired,
  onSetSelectedCountry: PropTypes.func.isRequired,
  onSetSelectedProvince: PropTypes.func.isRequired,
  onSetSelectedCity: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  [
    makeSelectedCountryObject(),
    makeAvailableCountries(),
    makeSelectedProvince(),
    makeSelectedCity(),
    makeProvinces(),
    makeHasProvinces(),
    makeProvinceCities(),
    makeProvinceHasCities(),
  ],
  (
    selectedCountry,
    availableCountries,
    selectedProvince,
    selectedCity,
    provinces,
    hasProvinces,
    cities,
    hasCities,
  ) => ({
    selectedCountry,
    availableCountries,
    selectedProvince,
    selectedCity,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartSettings);
