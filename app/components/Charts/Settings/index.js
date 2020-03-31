import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Grid,
  Button,
} from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';

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

import SelectCountry from './SelectCountry';
import SelectProvince from './SelectProvince';
import SelectCity from './SelectCity';
import { StyledGridItem } from './styles';

const ChartSettings = ({
  selectedCountry,
  availableCountries,
  onSetSelectedCountry,
  onSetSelectedProvince,
  onSetSelectedCity,
  selectedProvince,
  provinces,
  hasProvinces,
  selectedCity,
  cities,
  hasCities,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <SelectCountry
                selectedCountry={selectedCountry}
                availableCountries={availableCountries}
                onSetSelectedCountry={onSetSelectedCountry}
                disabled={!availableCountries.length}
              />
            </Grid>
            <StyledGridItem item>
              <SelectProvince
                selectedProvince={selectedProvince}
                provinces={provinces}
                onSetSelectedProvince={onSetSelectedProvince}
                disabled={!hasProvinces}
              />
            </StyledGridItem>
            <StyledGridItem item>
              <SelectCity
                selectedCity={selectedCity}
                cities={cities}
                onSetSelectedCity={onSetSelectedCity}
                disabled={!hasCities}
              />
            </StyledGridItem>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Fab onClick={handleClick} color="primary" size="medium">
        <SettingsIcon fontSize="small" />
      </Fab>
    </Fragment>
  );
};

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
