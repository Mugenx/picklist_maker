import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FileUpload from './components/fileUpload.jsx';
import Options from './components/options.jsx';
import Picklists from './components/picklists.jsx';
import MakeButton from './components/makeButton.jsx';
import Footer from './components/footer';
import csv from 'csvtojson';
import _ from 'lodash';
import './App.css';

class App extends Component {
  state = {
    data: null,
    fileName: null,
    picklists: null,
    checkedVersion: true,
    checkedExternal: true,
    checkedRank: true
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

  makePicklist = (rows, index, name) =>
    new Promise(resolve => {
      let value;
      let parents;
      const picklists = [];
      rows.forEach(row => {
        const row_value = row[index];
        const row_parents = _.take(row, index).filter(
          parent => !_.isEmpty(parent)
        );
        const diffValue =
          !_.isUndefined(value) ||
          (!_.isEmpty(row_value) && value !== row_value);
        const diffParents =
          !_.isUndefined(parents) ||
          (!_.isEmpty(row_parents) && !_.isEqual(parents, row_parents));

        if (diffValue) value = row_value;
        if (diffParents) parents = row_parents;
        if ((diffParents || diffValue) && value) {
          const picklist = { name, value, parents };
          if (index === 0) delete picklist['parents'];
          picklists.push(picklist);
        }
      });
      resolve(_.uniqWith(picklists, _.isEqual));
    });

  makeRows = () =>
    new Promise(resolve => {
      csv({
        noheader: true,
        output: 'csv'
      })
        .fromString(this.state.data)
        .then(csvRow => {
          resolve(csvRow);
        });
    });

  getPicklists = (rows, picklistNames) =>
    new Promise(resolve => {
      const picklists = picklistNames.map(async name => {
        const index = picklistNames.indexOf(name);
        const content = await this.makePicklist(rows, index, name);
        return { name, content };
      });
      resolve(Promise.all(picklists));
    });

  onMake = async () => {
    const rows = await this.makeRows();
    const picklistNames = rows.shift();
    const picklists = await this.getPicklists(rows, picklistNames);
    this.setState({ picklists });
  };

  handelVersion = () => {
    this.setState(state => ({
      checkedVersion: !state.checkedVersion
    }));
  };

  handelRank = async () => {
    this.setState(state => ({
      checkedRank: !state.checkedRank
    }));
    const picklists = await this.makeRank(this.state);
    this.setState({ picklists });
  };

  makeRank = ({ picklists, checkedRank }) =>
    new Promise(resolve => {
      picklists.map(({ content }) => {
        let rank = 1;
        return content.forEach(element => {
          delete element['rank'];
          if (checkedRank) element.rank = rank++;
        });
      });
      resolve(picklists);
    });

  handelExternal = async () => {
    this.setState(state => ({
      checkedExternal: !state.checkedExternal
    }));
    const picklists = await this.makeExternal(this.state);
    this.setState({ picklists });
  };

  makeExternal = ({ picklists, checkedExternal }) =>
    new Promise(resolve => {
      picklists.map(({ content }) =>
        content.map(element => {
          delete element['external'];
          if (checkedExternal) element.external = true;
          return element;
        })
      );
      resolve(picklists);
    });

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <a href="https://mugenx.io">
              <h1>Picklists Maker</h1>
            </a>
            <FileUpload
              fileName={this.state.fileName}
              onUpload={this.handleFile}
              disabled={this.state.picklists}
            />
            <MakeButton
              onMake={this.onMake}
              visible={this.state.data && !this.state.picklists}
            />
            <Options
              visible={this.state.picklists}
              onVersionlChecked={
                this.handelVersion // version
              }
              isVersionChecked={this.state.checkedVersion}
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
              checkedVersion={!this.state.checkedVersion}
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
