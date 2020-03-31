import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel } from '@material-ui/core';

import { DEFAULT_PROVINCE } from 'containers/HomePage/constants';

import { StyledNativeSelect } from 'components/Charts/Settings/styles';

const SelectProvince = ({
  onSetSelectedProvince,
  selectedProvince,
  provinces,
  disabled,
}) => (
  <FormControl>
    <InputLabel htmlFor="chart_setting_province">Province</InputLabel>
    <StyledNativeSelect
      value={selectedProvince}
      onChange={(event) => onSetSelectedProvince(event.target.value)}
      inputProps={{ id: 'chart_setting_province' }}
      disabled={disabled}
    >
      <option value={DEFAULT_PROVINCE}>all</option>
      {provinces.map((province) => (
        <option key={province} value={province}>
          {province}
        </option>
      ))}
    </StyledNativeSelect>
  </FormControl>
);

SelectProvince.propTypes = {
  selectedProvince: PropTypes.string.isRequired,
  provinces: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  onSetSelectedProvince: PropTypes.func.isRequired,
};

export default SelectProvince;
