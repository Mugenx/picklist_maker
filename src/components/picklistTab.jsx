import React, { Component } from 'react';

class PicklistTab extends Component {
  getClasses = () => {
    let classes = 'tab-pane fade picklists show language-java ';
    classes += this.props.index === this.props.activeTab && 'active';
    return classes;
  };

  render() {
    return (
      <code
        className={this.getClasses()}
        id={`v-pills-${this.props.name}`}
        role="tabpanel"
        aria-labelledby={`v-pills-${this.props.name}-tab`}
      >
        {this.props.content}
      </code>
    );
  }
}

export default PicklistTab;
