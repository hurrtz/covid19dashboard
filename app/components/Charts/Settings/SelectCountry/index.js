import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel } from '@material-ui/core';

import { StyledNativeSelect } from 'components/Charts/Settings/styles';

const SelectCountry = ({
  selectedCountry,
  availableCountries,
  onSetSelectedCountry,
  disabled,
}) => (
  <FormControl>
    <InputLabel htmlFor="chart_setting_country">Country</InputLabel>
    <StyledNativeSelect
      value={selectedCountry.Country}
      onChange={(event) => onSetSelectedCountry(event.target.value)}
      inputProps={{ id: 'chart_setting_country' }}
      disabled={disabled}
    >
      {availableCountries.map((country) => (
        <option key={country.Country} value={country.Country}>
          {country.Country}
        </option>
      ))}
    </StyledNativeSelect>
  </FormControl>
);

SelectCountry.propTypes = {
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
  onSetSelectedCountry: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SelectCountry;
