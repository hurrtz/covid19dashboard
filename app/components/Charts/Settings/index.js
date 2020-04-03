import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  IconButton,
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
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
  makeShowDays,
  makeScaleMethod,
} from 'containers/HomePage/selectors';
import {
  setSelectedCountry,
  setSelectedProvince,
  setSelectedCity,
  setShowDays,
  setScaleMethod,
} from 'containers/HomePage/actions';

import {
  SHOW_DAYS_ALL,
  SHOW_DAYS_LAST_7_DAYS,
  SCALE_METHOD_LINEAR,
  SCALE_METHOD_LOGARITHMIC,
} from './constants';
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
  showDays,
  scaleMethod,
  onSetShowDays,
  onSetScaleMethod,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeShowDays = (_, newShowDays) => {
    if (newShowDays) {
      onSetShowDays(newShowDays);
    }
  };

  const handleChangeScaleMethod = (_, newScaleMethod) => {
    if (newScaleMethod) {
      onSetScaleMethod(newScaleMethod);
    }
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
      <Grid container spacing={2}>
        <Grid item>
          <ToggleButtonGroup
            value={scaleMethod}
            size="small"
            exclusive
            onChange={handleChangeScaleMethod}
          >
            <ToggleButton value={SCALE_METHOD_LINEAR}>linear</ToggleButton>
            <ToggleButton value={SCALE_METHOD_LOGARITHMIC}>
              logarithmic
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={showDays}
            size="small"
            exclusive
            onChange={handleChangeShowDays}
          >
            <ToggleButton value={SHOW_DAYS_LAST_7_DAYS}>
              last 7 days
            </ToggleButton>
            <ToggleButton value={SHOW_DAYS_ALL}>all days</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <IconButton size="medium" onClick={handleClick}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
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
  showDays: PropTypes.number.isRequired,
  scaleMethod: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ).isRequired,
  hasCities: PropTypes.bool.isRequired,
  onSetSelectedCountry: PropTypes.func.isRequired,
  onSetSelectedProvince: PropTypes.func.isRequired,
  onSetSelectedCity: PropTypes.func.isRequired,
  onSetShowDays: PropTypes.func.isRequired,
  onSetScaleMethod: PropTypes.func.isRequired,
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
    makeShowDays(),
    makeScaleMethod(),
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
    showDays,
    scaleMethod,
  ) => ({
    selectedCountry,
    availableCountries,
    selectedProvince,
    selectedCity,
    provinces,
    hasProvinces,
    cities,
    hasCities,
    showDays,
    scaleMethod,
  }),
);

const mapDispatchToProps = (dispatch) => ({
  onSetSelectedCountry: (selectedCountry) =>
    dispatch(setSelectedCountry(selectedCountry)),
  onSetSelectedProvince: (selectedProvince) =>
    dispatch(setSelectedProvince(selectedProvince)),
  onSetSelectedCity: (selectedCity) => dispatch(setSelectedCity(selectedCity)),
  onSetShowDays: (showDays) => dispatch(setShowDays(showDays)),
  onSetScaleMethod: (scaleMethod) => dispatch(setScaleMethod(scaleMethod)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartSettings);
