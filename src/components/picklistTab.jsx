import React, { Component } from 'react';

class PicklistTab extends Component {
  getClasses = () => {
    let classes = 'tab-pane fade form-control picklists show ';
    classes += this.props.index === this.props.activeTab && 'active';
    return classes;
  };

  makeContent = () => {
    const { content } = this.props;
    let text = `[${JSON.stringify(content).replace(/\\r/g, '')}]`;
    text = text.slice(1, -1);
    text = text.replace(/:/g, ' : ');
    text = text.replace(/","value"/g, '",\n"value"');
    text = text.replace(/","parents"/g, '",\n"parents"');
    text = text.replace(/","external"/g, '",\n"external"');
    text = text.replace(/],"external"/g, '],\n"external"');
    text = text.replace(/,"rank"/g, ',\n"rank"');
    text = text.replace(/},{/g, ',},\n{');
    text = text.replace(/{/g, ' {\n');
    text = text.replace(/\[ {/g, '[{');
    text = text.replace(/}/g, '\n }');
    text = text.replace(/"name"/g, '    "name"');
    text = text.replace(/"value"/g, '    "value"');
    text = text.replace(/"parents"/g, '    "parents"');
    text = text.replace(/,"external"/g, ',\n"external"');
    text = text.replace(/"external"/g, '    "external"');
    text = text.replace(/"rank"/g, '    "rank"');
    text = text.replace(/","/g, '", "');
    return text;
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
