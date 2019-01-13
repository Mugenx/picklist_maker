import React, { Component } from 'react';

class PicklistPill extends Component {
  getClasses = () => {
    let classes = 'nav-link ';
    classes += this.props.index === this.props.activePill && 'active';
    return classes;
  };

  render() {
    return (
      <a
        className={this.getClasses()}
        id={`v-pills-${this.props.name}-tab`}
        data-toggle="pill"
        href={`#v-pills-${this.props.name}`}
        role="tab"
        aria-controls={`v-pills-${this.props.name}`}
        aria-selected="true"
        onClick={() => this.props.handelActive(this.props.index)}
      >
        {this.props.name}
      </a>
    );
  }
}

export default PicklistPill;
