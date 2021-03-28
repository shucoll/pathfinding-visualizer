import styles from './Header.module.scss';

import React, { useState } from 'react';

import { ReactComponent as InfoSvg } from '../../assets/information.svg';

const Header = (props) => {
  const [algorithm, setAlgorithm] = useState(null);

  const handleDropDownItemClicked = (value) => {
    setAlgorithm(value);
  };

  const handleVisualize = () => {
    if (algorithm) props.visualize(algorithm);
  };

  const handleClearGrid = () => {
    props.clearGrid();
  };

  const handleClearWalls = () => {
    props.clearWalls();
  };

  const visualizerInfoElement = (
    <div className={styles.info__box}>
      <p>
        Welcome to the <br /> PathFinding Visualizer
      </p>
      <div className={styles.info__boxGrid}>
        <div className={styles.info__boxGrid__row}>
          <span>Start Node</span>
          <div
            className={`${styles.info__boxGrid__rowNode} 
            ${styles.info__boxGrid__rowNodeStart} `}
          ></div>
        </div>

        <div className={styles.info__boxGrid__row}>
          <span>End Node</span>
          <div
            className={`${styles.info__boxGrid__rowNode} 
            ${styles.info__boxGrid__rowNodeEnd} `}
          ></div>
        </div>

        <div className={styles.info__boxGrid__row}>
          <span>Wall</span>
          <div
            className={`${styles.info__boxGrid__rowNode} 
            ${styles.info__boxGrid__rowNodeWall} `}
          ></div>
        </div>

        <div className={styles.info__boxGrid__row}>
          <span>Visited Node</span>
          <div
            className={`${styles.info__boxGrid__rowNode} 
            ${styles.info__boxGrid__rowNodeVisited} `}
          ></div>
        </div>

        <div className={styles.info__boxGrid__row}>
          <span>Shortest path nodes</span>
          <div
            className={`${styles.info__boxGrid__rowNode} 
            ${styles.info__boxGrid__rowNodeShortest} `}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.name}>PathFinding Visualizer</div>
      <div className={styles.info}>
        <InfoSvg width='30px' className={styles.info__svg} />
        {visualizerInfoElement}
      </div>
      <div className={styles.controls}>
        <div className={styles.features}>
          <div className={styles.dropdown}>
            <button className={`${styles.btn} ${styles.btn__dropdown}`}>
              Choose Algorithm
            </button>
            <div className={styles.dropdownContent}>
              <button
                className={`${styles.btn}`}
                onClick={() => handleDropDownItemClicked('Dijkstra')}
              >
                Dijkstra
              </button>
              <button
                className={`${styles.btn}`}
                onClick={() => handleDropDownItemClicked('BFS')}
              >
                BFS
              </button>
              <button
                className={`${styles.btn}`}
                onClick={() => handleDropDownItemClicked('DFS')}
              >
                DFS
              </button>
            </div>
          </div>
          <button className={`${styles.btn}`} onClick={handleClearGrid}>
            Clear Grid
          </button>

          <button className={`${styles.btn}`} onClick={handleClearWalls}>
            Clear Walls
          </button>
        </div>

        <button
          className={`${styles.btn} ${styles.btn__visualize}`}
          onClick={handleVisualize}
        >
          Visualize {algorithm}
        </button>
      </div>
    </header>
  );
};

export default Header;
