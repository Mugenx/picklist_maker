import React, { Component } from 'react';

class FileUpload extends Component {
  getFileName = () => {
    return this.props.fileName || 'Choose A File...';
  };

  render() {
    return (
      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id="filesInput"
          onChange={this.props.onUpload}
          required
          disabled={this.props.disabled}
        />
        <label className="custom-file-label">{this.getFileName()}</label>
      </div>
    );
  }
}

export default FileUpload;
