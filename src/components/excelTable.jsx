import React, { Component } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class ExcelTable extends Component {
  makeGrid = (x, y) =>
    Array.from(Array(y), (n, row) =>
      Array.from(Array(x), (n, col) =>
        col === 0
          ? { readOnly: true, value: ++row, width: 100 }
          : { value: null }
      )
    );

  constructor(props) {
    super(props);
    this.state = { x: 5, y: 10 };
    const { x, y } = this.state;
    const grid = this.makeGrid(x, y);
    this.state.grid = grid;
  }

  getClass = () => {
    return `excel-table${this.props.onFreeze ? '-disabled' : ''}`;
  };

  render() {
    return (
      !this.props.disabled && (
        <ReactDataSheet
          className={this.getClass()}
          overflow="clip"
          disableEvents="true"
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onContextMenu={(e, cell, i, j) =>
            cell.readOnly ? e.preventDefault() : null
          }
          parsePaste={string => {
            this.props.onParsePaste(string);
            const data = string.split('\n').map(row => row.split('\t'));
            const x = Math.max(...data.map(arr => arr.length)) + 1;
            const y = data.length - 1;
            if (x > this.state.x || y > this.state.y) {
              const grid = this.makeGrid(x, y);
              this.setState({ grid });
            }
            return data;
          }}
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
          }}
        />
      )
    );
  }
}

export default ExcelTable;
