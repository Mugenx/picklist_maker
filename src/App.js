import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FileUpload from './components/fileUpload.jsx';
import Picklists from './components/picklists.jsx';
import MakeButton from './components/makeButton.jsx';
import Footer from './components/footer';
import _ from 'lodash';
import './App.css';

class App extends Component {
  state = {
    data: null,
    picklists: null,
    disabled: false
  };

  handleFile = () => {
    const file = document.getElementById('filesInput').files[0];
    const reader = new FileReader();

    reader.addEventListener('load', e => {
      const { result } = e.target;
      const data = result;
      this.setState({ data });
    });

    reader.readAsText(file);
  };

  makePicklist = (rows, index, picklistName) =>
    new Promise(resolve => {
      let last_value;
      let last_parents;
      const picklists = [];
      _.each(rows, row => {
        const current_value = row[index];
        const current_parents = _.take(row, index).filter(
          parent => !_.isEmpty(parent)
        );
        const diffValue =
          !_.isUndefined(last_value) ||
          (!_.isEmpty(current_value) && last_value !== current_value);
        const diffParents =
          !_.isUndefined(last_parents) ||
          (!_.isEmpty(current_parents) &&
            !_.isEqual(last_parents, current_parents));

        if (diffValue) last_value = current_value;
        if (diffParents) last_parents = current_parents;
        if ((diffParents || diffValue) && last_value) {
          const picklist = {
            name: picklistName,
            value: last_value,
            parents: last_parents
            // external: true
          };
          if (index === 0) delete picklist['parents'];
          picklists.push(picklist);
        }
      });
      resolve(_.uniqWith(picklists, _.isEqual));
    });

  makeData = () =>
    new Promise(resolve => {
      const data = this.state.data.split('\n');
      resolve(data.map(element => element.split(',')));
    });

  getPicklists = (rows, picklistNames) =>
    new Promise(resolve => {
      const picklists = [];
      picklistNames.forEach(async picklistName => {
        const index = picklistNames.indexOf(picklistName);
        const content = await this.makePicklist(rows, index, picklistName);
        picklists.push({ name: picklistName, content: content });
      });
      resolve(picklists);
    });

  onMake = async () => {
    const disabled = true;
    const data = await this.makeData();

    const picklistNames = data[0];
    data.shift();
    const rows = data;

    const picklists = await this.getPicklists(rows, picklistNames);
    this.setState({ disabled, picklists });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <h1>Picklists Maker</h1>
            <FileUpload
              onUpload={this.handleFile}
              disabled={this.state.disabled}
            />
            <MakeButton
              onMake={this.onMake}
              visible={!!this.state.data && !this.state.picklists}
            />
            <Picklists
              picklists={this.state.picklists}
              visible={this.state.picklists}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
