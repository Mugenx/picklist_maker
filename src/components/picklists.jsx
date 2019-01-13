import React, { Component } from 'react';
import Pill from './picklistPill';
import Tab from './picklistTab';

class Picklists extends Component {
  state = {
    active: 0
  };

  handelActive = active => {
    this.setState({ active });
  };

  getPills = () => {
    const { picklists } = this.props;
    return (
      picklists &&
      picklists.map(picklist => {
        return (
          <Pill
            key={picklist.name}
            index={picklists.indexOf(picklist)}
            name={picklist.name}
            handelActive={this.handelActive}
            activePill={this.state.active}
          />
        );
      })
    );
  };

  getTabs = () => {
    const { picklists } = this.props;
    return (
      picklists &&
      picklists.map(picklist => {
        return (
          <Tab
            key={picklist.name}
            index={picklists.indexOf(picklist)}
            name={picklist.name}
            content={
              picklists.indexOf(picklist) === picklists.length - 1
                ? JSON.stringify(picklist.content).replace(/\\r/g, '')
                : JSON.stringify(picklist.content)
            }
            activeTab={this.state.active}
          />
        );
      })
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {this.getPills()}
          </div>
        </div>
        <div className="col-9">
          <div className="tab-content" id="v-pills-tabContent">
            {this.getTabs()}
          </div>
        </div>
      </div>
    );
  }
}

export default Picklists;
