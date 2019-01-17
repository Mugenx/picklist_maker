import React, { Component } from 'react';

class PicklistPill extends Component {
  getClasses = () => {
    let classes = 'nav-link ';
    classes += this.props.index === this.props.activePill && 'active';
    return classes;
  };

  render() {
    return (
      <div
        className={this.getClasses()}
        id={`v-pills-${this.props.name}-tab`}
        data-toggle="pill"
        role="tab"
        aria-controls={`v-pills-${this.props.name}`}
        aria-selected="true"
        onClick={() => this.props.handelActive(this.props.index)}
      >
        {this.props.name}
      </div>
    );
  }
}

export default PicklistPill;
