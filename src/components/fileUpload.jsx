import React, { Component } from 'react';

class FileUpload extends Component {
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
        <label className="custom-file-label">Choose A File...</label>
      </div>
    );
  }
}

export default FileUpload;
