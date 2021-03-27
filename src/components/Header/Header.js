import styles from './Header.module.scss';

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [algo, setAlgo] = useState(null);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleDropDownItemClicked = (value) => {
    setAnchorEl(null);
    setAlgo(value);
  };

  const handleVisualize = () => {
    // console.log(props);
    props.visualize(algo);
  };

  const handleClearGrid = () => {
    props.clearGrid();
  }

  const handleClearWalls = () => {
    props.clearWalls();
  }

  return (
    <header className={styles.header}>
      <div className={styles.name}>PathFinding Visualizer</div>

      <div className={styles.controls}>
        <div className={styles.algoDropdown}>
          <Button
            color='inherit'
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleDropdownClick}
          >
            Choose Algorithm
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={() => handleDropDownItemClicked('Dijkstra')}>
              Dijkstra
            </MenuItem>
            <MenuItem onClick={() => handleDropDownItemClicked('BFS')}>
              BFS
            </MenuItem>
            <MenuItem onClick={() => handleDropDownItemClicked('DFS')}>
              DFS
            </MenuItem>
          </Menu>
        </div>

        <Button color='inherit' onClick={handleVisualize}>
          Visualize {algo}
        </Button>

        <Button color='inherit' onClick={handleClearGrid}>
          Clear Grid
        </Button>

        <Button color='inherit' onClick={handleClearWalls}>
          Clear Walls
        </Button>
      </div>
    </header>
  );
};

export default Header;
