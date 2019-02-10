import React from 'react';
import PropTypes from 'prop-types';
import './DataPanel.scss'

const DataPanel = props => (
  <div className="DataPanel">
    <p className="DataPanel__count">{props.count}</p>
    <p className="DataPanel__name">{props.name}</p>
  </div>
);

DataPanel.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default DataPanel;