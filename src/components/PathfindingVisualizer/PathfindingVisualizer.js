
import { useState } from 'react';

import styles from "./PathfindingVisualizer.module.scss"

import Node from './Node/Node';



const PathfindingVisualizer = (props) => {

  const ROW_COUNT = 20;
  const COLUMN_COUNT = 50;


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

  
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: false,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const [grid, changeGrid] = useState(getInitialGrid());


  return (
    <div className={styles.grid}>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const {row, col, isFinish, isStart, isWall} = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  //mouseIsPressed={mouseIsPressed}
                  //onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                  // onMouseEnter={(row, col) =>
                  //   this.handleMouseEnter(row, col)
                  // }
                  // onMouseUp={() => this.handleMouseUp()}
                  row={row}/>
              );
            })}
          </div>
        );
      })}
    </div>
  );

}

export default PathfindingVisualizer
