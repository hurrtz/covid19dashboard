import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

const numberFormat = Intl.NumberFormat();

const renderLabel = (label) =>
  label ? (
    <Typography gutterBottom variant="h6" component="h2">
      {label}
    </Typography>
  ) : undefined;

const renderConfirmedText = (value) =>
  value ? (
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
    >{`Confirmed: ${numberFormat.format(value)}`}</Typography>
  ) : undefined;

const renderRecoveredText = (value) =>
  value ? (
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
    >{`Recovered: ${numberFormat.format(value)}`}</Typography>
  ) : undefined;

const renderDeathsText = (value) =>
  value ? (
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
    >{`Deaths: ${numberFormat.format(value)}`}</Typography>
  ) : undefined;

const LinechartTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Card variant="outlined">
        <CardContent>
          {renderLabel(label)}
          {payload && payload[0] && renderConfirmedText(payload[0].value)}
          {payload && payload[1] && renderRecoveredText(payload[1].value)}
          {payload && payload[2] && renderDeathsText(payload[2].value)}
        </CardContent>
      </Card>
    );
  }

  return null;
};

LinechartTooltip.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ),
};

export default LinechartTooltip;
