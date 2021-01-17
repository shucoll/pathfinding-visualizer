import styles from './Node.module.scss';


const Node = props => {

  const {
    col,
    isFinish,
    isStart,
    isWall,
    // onMouseDown,
    // onMouseEnter,
    // onMouseUp,
    row,
  } = props;

  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

  return(
    <div
    id={`node-${row}-${col}`}
    className={styles.node}
    // onMouseDown={() => onMouseDown(row, col)}
    // onMouseEnter={() => onMouseEnter(row, col)}
    // onMouseUp={() => onMouseUp()}
    >
      
    </div>
  );

};


export default Node;