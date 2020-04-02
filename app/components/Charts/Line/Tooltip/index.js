import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

const numberFormat = Intl.NumberFormat();

const LinechartTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {label}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >{`Confirmed: ${numberFormat.format(payload[0].value)}`}</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >{`Recovered: ${numberFormat.format(payload[1].value)}`}</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >{`Deaths: ${numberFormat.format(payload[2].value)}`}</Typography>
        </CardContent>
      </Card>
    );
  }

  return null;
};

LinechartTooltip.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
    }),
  ),
};

export default LinechartTooltip;
