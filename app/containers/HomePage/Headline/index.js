import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  DEFAULT_COUNTRY,
  DEFAULT_PROVINCE,
  DEFAULT_CITY,
} from 'containers/HomePage/constants';

const Headline = ({ country, province, city, className }) => {
  const parts = [];

  if (country !== DEFAULT_COUNTRY) {
    parts.push(country);
  }

  if (province !== DEFAULT_PROVINCE) {
    parts.push(province);
  }

  if (city !== DEFAULT_CITY) {
    parts.push(city);
  }

  return (
    <Typography variant="h6" className={className}>
      {parts.map((part, index) => (
        <span>
          {index ? ', ' : undefined}
          {part}
        </span>
      ))}
    </Typography>
  );
};

Headline.propTypes = {
  country: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Headline;
