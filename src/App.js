import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FileUpload from './components/fileUpload.jsx';
import Options from './components/options.jsx';
import Picklists from './components/picklists.jsx';
import MakeButton from './components/makeButton.jsx';
import Footer from './components/footer';
import _ from 'lodash';
import './App.css';

class App extends Component {
  state = {
    data: null,
    fileName: null,
    picklists: null,
    disabled: false,
    checkedRank: true,
    checkedExternal: true
  };

  handleFile = () => {
    const file = document.getElementById('filesInput').files[0];
    const fileName = file.name;
    this.setState({ fileName });

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
            // external: true,
            // rank: 1,
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

    let picklists = await this.getPicklists(rows, picklistNames);
    this.setState({ disabled, picklists });
  };

  handelRank = async () => {
    this.setState((state, props) => ({
      checkedRank: !state.checkedRank
    }));
    const picklists = await this.makeRank(this.state);
    this.setState({ picklists });
  };

  makeRank = ({ picklists, checkedRank }) =>
    new Promise(resolve => {
      picklists.forEach(({ content }) => {
        let rank = 1;
        content.forEach(element => {
          if (checkedRank) {
            element.rank = rank++;
          } else {
            delete element['rank'];
          }
        });
      });
      resolve(picklists);
    });

  handelExternal = async () => {
    this.setState((state, props) => ({
      checkedExternal: !state.checkedExternal
    }));
    const picklists = await this.makeExternal(this.state);
    this.setState({ picklists });
  };

  makeExternal = ({ picklists, checkedExternal }) =>
    new Promise(resolve => {
      picklists.forEach(({ content }) => {
        content.forEach(element => {
          if (checkedExternal) {
            element.external = true;
          } else {
            delete element['external'];
          }
        });
      });
      resolve(picklists);
    });

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <h1>Picklists Maker</h1>
            <FileUpload
              fileName={this.state.fileName}
              onUpload={this.handleFile}
              disabled={this.state.disabled}
            />
            <MakeButton
              onMake={this.onMake}
              visible={this.state.data && !this.state.picklists}
            />
            <Options
              visible={this.state.picklists}
              onExternalChecked={
                this.handelExternal // External
              }
              isExternalChecked={this.state.checkedExternal}
              onRankChecked={
                this.handelRank // Rank
              }
              isRankChecked={this.state.checkedRank}
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
