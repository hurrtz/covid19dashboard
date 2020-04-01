import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { DEFAULT_PROVINCE, DEFAULT_CITY } from 'containers/HomePage/constants';

const Headline = ({ country, province, city, className }) => {
  const parts = [];

  if (country) {
    parts.push(country);
  }

  if (province !== DEFAULT_PROVINCE) {
    parts.push(province);
  }

  if (city !== DEFAULT_CITY) {
    parts.push(city);
  }

  return (
    <Typography className={className}>
      {parts.map((part, index) => (
        <span key={part}>
          {index ? ', ' : undefined}
          {part}
        </span>
      ))}
    </Typography>
  );
};

Headline.propTypes = {
  country: PropTypes.string.isRequired,
  province: PropTypes.string,
  city: PropTypes.string,
  className: PropTypes.string,
};

Headline.defaultProps = {
  province: DEFAULT_PROVINCE,
  city: DEFAULT_CITY,
};

export default Headline;
