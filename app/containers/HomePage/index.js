/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Typography,
  Divider,
  FormControl,
  NativeSelect,
  FormHelperText,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

import { makeSelectCountry } from './selectors';
import { setSelectedCountry } from './actions';
import { AVAILABLE_COUNTRIES } from './constants';

import messages from './messages';

const homePage = ({ selectedCountry, handleSetSelectedCountry }) => (
  <Grid container direction="column">
    <Grid item>
      <Typography variant="h2">
        <FormattedMessage {...messages.header} />
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="h3">Dashboard</Typography>
    </Grid>
    <Divider />
    <Grid container>
      <Grid item>
        <FormControl>
          <NativeSelect
            value={selectedCountry}
            onChange={(event) => handleSetSelectedCountry(event.target.value)}
          >
            {AVAILABLE_COUNTRIES.map((country) => (
              <option key={country.slug} value={country.name}>
                {country.name}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>select your country</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  </Grid>
);

homePage.propTypes = {
  selectedCountry: PropTypes.string.isRequired,
  handleSetSelectedCountry: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectCountry(),
  (selectedCountry) => ({ selectedCountry }),
);

const mapDispatchToProps = (dispatch) => ({
  handleSetSelectedCountry: (selectedCountry) =>
    dispatch(setSelectedCountry(selectedCountry)),
});

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
