import React, { Component } from 'react';
import jsonFormat from '../lib/json-format';

class PicklistTab extends Component {
  getClasses = () => {
    let classes = 'tab-pane fade form-control picklists show ';
    classes += this.props.index === this.props.activeTab && 'active';
    return classes;
  };

  makeContent = () => {
    const { content, checkedVersion } = this.props;
    return jsonFormat(content, checkedVersion).replace(/\\r/g, '');
  };

  render() {
    return (
      <textarea
        className={this.getClasses()}
        id={`v-pills-${this.props.name}`}
        role="tabpanel"
        aria-labelledby={`v-pills-${this.props.name}-tab`}
        value={this.makeContent()}
        autoCapitalize="off"
        spellCheck="false"
        readOnly
      />
    );
  }
}

export default PicklistTab;
