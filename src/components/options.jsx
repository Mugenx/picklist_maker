import React, { Component } from 'react';

class Options extends Component {
  getClasses = () => {
    let classes = 'd-flex justify-content-end ';
    return this.props.visible ? classes : classes + 'invisible';
  };

  render() {
    return (
      <div className={this.getClasses()}>
        <div className="custom-control custom-switch d-inline mr-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="external"
            checked={!this.props.isExternalChecked}
            onChange={this.props.onExternalChecked}
          />
          <label className="custom-control-label" htmlFor="external">
            External
          </label>
        </div>
        <div className="custom-control custom-switch d-inline">
          <input
            type="checkbox"
            className="custom-control-input"
            id="rank"
            checked={!this.props.isRankChecked}
            onChange={this.props.onRankChecked}
          />
          <label className="custom-control-label" htmlFor="rank">
            Rank
          </label>
        </div>
      </div>
    );
  }
}

export default Options;
