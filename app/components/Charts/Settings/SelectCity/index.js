import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel } from '@material-ui/core';

import { DEFAULT_CITY } from 'containers/HomePage/constants';

import { StyledNativeSelect } from 'components/Charts/Settings/styles';

const SelectCity = ({ onSetSelectedCity, selectedCity, cities, disabled }) => (
  <FormControl>
    <InputLabel htmlFor="chart_setting_city">City</InputLabel>
    <StyledNativeSelect
      value={selectedCity}
      onChange={(event) => onSetSelectedCity(event.target.value)}
      inputProps={{ id: 'chart_setting_city' }}
      disabled={disabled}
    >
      <option value={DEFAULT_CITY}>all</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </StyledNativeSelect>
  </FormControl>
);

SelectCity.propTypes = {
  selectedCity: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ).isRequired,
  disabled: PropTypes.bool.isRequired,
  onSetSelectedCity: PropTypes.func.isRequired,
};

export default SelectCity;
