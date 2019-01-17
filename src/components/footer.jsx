import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="text-center footer-text mt-5">
        <div className="copy-right d-inline">
          © {new Date().getFullYear()} &nbsp;
          <a href="https://mugenx.io">MUGENX.IO</a>
        </div>
      </div>
    );
  }
}

export default Footer;
