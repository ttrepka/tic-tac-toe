import React from 'react';
import { connect } from 'react-redux';

const Championship = ({ won, lost, tied }) => (
  <>
    <h1>Championship Stats</h1>
    <ul>
      <li>
        Won: <b>{won}</b>
      </li>
      <li>
        Lost: <b>{lost}</b>
      </li>
      <li>
        Tied: <b>{tied}</b>
      </li>
    </ul>
  </>
);

export default connect(({ stats: { overallScore: { won, lost, tied } } }) => ({ won, lost, tied }))(
  Championship
);
