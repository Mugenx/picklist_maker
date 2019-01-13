import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="text-center footer-text mt-5">
        <div className="d-inline-block">
          <a href="../../public/sample.csv" className="sampleFile" download>
            Download Sample
          </a>
        </div>
        <div className="d-inline-block copy-right">
          © {new Date().getFullYear()} Copyright :
        </div>
        <div className="d-inline-block footer">
          <a href="#">Picklist_Maker</a>
        </div>
      </div>
    );
  }
}

export default Footer;
