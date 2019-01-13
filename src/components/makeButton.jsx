import React, { Component } from 'react';

class MakeButton extends Component {
  getClasses = () => {
    let classes = 'btn btn-block ';
    return this.props.visible ? classes + 'mt-3' : classes + 'invisible';
  };

  render() {
    return (
      // <div class="btn-group" role="group" aria-label="Button group">
      <button
        type="button"
        className={this.getClasses()}
        onClick={this.props.onMake}
      >
        Make
      </button>
      // </div>
    );
  }
}

export default MakeButton;
