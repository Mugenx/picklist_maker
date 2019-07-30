import React, { Component } from 'react';

class FileUpload extends Component {
  getFileName = () => {
    return this.props.fileName || 'Choose A File...';
  };

  render() {
    return (
      !this.props.disabled && (
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="filesInput"
            onChange={this.props.onUpload}
            required
            disabled={!!this.props.disabled || !!this.props.onFreeze}
          />
          <label className="custom-file-label text-center">
            {this.getFileName()}
          </label>
        </div>
      )
    );
  }
}

export default FileUpload;
