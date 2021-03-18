import { useState } from 'react';

import './PathfindingVisualizer.scss';

import Node from './Node/Node';
import Header from '../Header/Header';

import { dijkstra } from '../algorithms/dijkstra';

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

  const getNewGridWithWallToggled = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];

    const newNode = {
      ...node,
      isWall: !node.isWall,
    };

    newGrid[row][col] = newNode;

    return newGrid;
  };

  const getNewGridWithTerminalNodeChange = (row, col, terminal) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
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
    newGrid[row][col] = newNode;

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
      const newGrid = getNewGridWithTerminalNodeChange(row, col, 'start');
      changeGrid(newGrid);
    } else if (finishPressed) {
      const newGrid = getNewGridWithTerminalNodeChange(row, col, 'finish');
      changeGrid(newGrid);
    } else {
      const newGrid = getNewGridWithWallToggled(row, col);
      changeGrid(newGrid);
    }
  };

  const handleMouseLeave = (row, col) => {
    if (startPressed) {
      const newGrid = getNewGridWithTerminalNodeChange(row, col, 'start');
      changeGrid(newGrid);
    } else if (finishPressed) {
      const newGrid = getNewGridWithTerminalNodeChange(row, col, 'finish');
      changeGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    changeStartPressed(false);
    changeFinishPressed(false);
    changeMousePressed(false);
  };

  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  };

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  };

  const visualizeAlgorithm = (algorithm) => {
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[END_ROW][END_COL];

    let visitedNodesInOrder;

    switch (algorithm) {
      case 'Dijkstra':
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      default:
    }

    visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
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

  return (
    <>
      <Header visualize={(algo) => visualizeAlgorithm(algo) } />
      <main className={'gridContainer'}>{gridElement}</main>
    </>
  );
};

export default PathfindingVisualizer;
