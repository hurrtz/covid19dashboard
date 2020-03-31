import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import Headline from './Headline';

export const StyledPaper = styled(Paper)`
  position: relative;
`;

export const StyledHeadline = styled(Headline)`
  padding: 24px 24px 12px;
`;

export const SettingsWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: -24px;
`;
