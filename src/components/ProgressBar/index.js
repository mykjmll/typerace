/**
 *
 * ProgressBar
 *
 */

import React from 'react';
import { StyledProgressBar, StyledProgress } from './StyledProgressBar';

function ProgressBar(props) {
  const { value } = props;
  return (
    <StyledProgressBar className="progress">
      <StyledProgress
        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
        role="progressbar"
        aria-valuenow={Number.isNaN(value) ? 0 : value}
        aria-valuemin="0"
        aria-valuemax="100"
        value={Number.isNaN(value) ? 0 : value}
      />
    </StyledProgressBar>
  );
}


export default ProgressBar;
