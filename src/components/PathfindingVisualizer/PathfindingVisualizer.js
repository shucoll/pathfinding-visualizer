import { useState } from 'react';

import './PathfindingVisualizer.scss';

import Node from './Node/Node';

//onMouseDown = just pressing the mouse button
//onMouseUp = releasing the mouse button
//onMouseEnter = hovering over a element with mouse

let START_ROW = 10;
let START_COL = 15;
let END_ROW = 10;
let END_COL = 35;

const PathfindingVisualizer = (props) => {
  const ROW_COUNT = 20;
  const COLUMN_COUNT = 50;

  // const START_NODE_ROW = 10;
  // const START_NODE_COL = 15;
  // const END_NODE_ROW = 10;
  // const END_NODE_COL = 35;

  // const [START_ROW, changeStartRow] = useState(START_NODE_ROW);
  // const [START_COL, changeStartCol] = useState(START_NODE_COL);
  // const [END_ROW, changeEndRow] = useState(END_NODE_ROW);
  // const [END_COL, changeEndCol] = useState(END_NODE_COL);

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_ROW && col === START_COL,
      isFinish: row === END_ROW && col === END_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const getInitialGrid = () => {
    const initialGrid = [];
    for (let row = 0; row < ROW_COUNT; row++) {
      const currentRow = [];
      for (let col = 0; col < COLUMN_COUNT; col++) {
        currentRow.push(createNode(col, row));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const [grid, changeGrid] = useState(getInitialGrid());
  const [mouseIsPressed, changeMousePressed] = useState(false);
  const [startPressed, changeStartPressed] = useState(false);
  const [finishPressed, changeFinishPressed] = useState(false);
  //const startPressed = false;

  const getNewGridWithWallToggled = (row, col) => {
    const newGrid = grid.slice();
    // console.log('newGrid', newGrid);

    // console.log(row, col);

    const node = newGrid[row][col];

    //console.log('node', node);
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };

    //console.log('newNode', newNode);
    newGrid[row][col] = newNode;

    //console.log('newGrid', newGrid);

    return newGrid;
  };

  const getNewGridWithStartNodeChange = (row, col, terminal) => {
    const newGrid = grid.slice();
    // console.log('newGrid', newGrid);

    // console.log(row, col);

    const node = newGrid[row][col];

    //console.log('node', node);
    let newNode;
    if (terminal === 'start') {
      newNode = {
        ...node,
        isStart: !node.isStart,
      };
      START_ROW = row;
      START_COL = col;
    } else {
      newNode = {
        ...node,
        isFinish: !node.isFinish,
      };
      END_ROW = row;
      END_COL = col;
    }

    //console.log('newNode', newNode);

    newGrid[row][col] = newNode;

    //console.log('newGrid', newGrid);

    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    if (row === START_ROW && col === START_COL) {
      changeStartPressed(true);
    } else if (row === END_ROW && col === END_COL) {
      changeFinishPressed(true);
    } else {
      const newGrid = getNewGridWithWallToggled(row, col);
      changeGrid(newGrid);
    }
    changeMousePressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    else if (startPressed) {
      const newGrid = getNewGridWithStartNodeChange(row, col, 'start');
      changeGrid(newGrid);
    } else if (finishPressed) {
      const newGrid = getNewGridWithStartNodeChange(row, col, 'finish');
      changeGrid(newGrid);
    } else {
      const newGrid = getNewGridWithWallToggled(row, col);
      changeGrid(newGrid);
    }
  };

  const handleMouseLeave = (row, col) => {
    if (startPressed) {
      const newGrid = getNewGridWithStartNodeChange(row, col, 'start');
      changeGrid(newGrid);
    } else if (finishPressed) {
      const newGrid = getNewGridWithStartNodeChange(row, col, 'finish');
      changeGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    changeStartPressed(false);
    changeFinishPressed(false);
    changeMousePressed(false);
  };

  const gridElement = (
    <div className={'grid'}>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  row={row}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseLeave={() => handleMouseLeave(row, col)}
                  onMouseUp={() => handleMouseUp()}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return <main className={'gridContainer'}>{gridElement}</main>;
};

export default PathfindingVisualizer;
