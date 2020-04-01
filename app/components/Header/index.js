import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Tooltip,
  ButtonGroup,
} from '@material-ui/core';
import {
  Timeline as LineChartIcon,
  Public as MapChartIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import {
  CHART_TYPE_LINE_CHART,
  CHART_TYPE_MAP_CHART,
} from 'containers/HomePage/constants';
import messages from './messages';

const Header = ({ chartType, handleChangeChartType }) => (
  <AppBar position="static" color="transparent">
    <Toolbar>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6">
            <FormattedMessage {...messages.header} /> <span>&mdash;</span>{' '}
            Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Tooltip title="Line chart">
              <IconButton
                color={
                  chartType === CHART_TYPE_LINE_CHART ? 'primary' : 'default'
                }
                onClick={() => handleChangeChartType(CHART_TYPE_LINE_CHART)}
              >
                <LineChartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="World Map">
              <IconButton
                disabled
                color={
                  chartType === CHART_TYPE_MAP_CHART ? 'primary' : 'default'
                }
                onClick={() => handleChangeChartType(CHART_TYPE_MAP_CHART)}
              >
                <MapChartIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  chartType: PropTypes.string.isRequired,
  handleChangeChartType: PropTypes.func.isRequired,
};

export default Header;
