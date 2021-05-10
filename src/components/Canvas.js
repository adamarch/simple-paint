import _                      from 'lodash';
import { useRef, useEffect }  from 'react';
import { Cell }               from './Cell';
import styles                 from './Canvas.module.css';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  setDimensions,
  setCellColor,
  selectDimensions,
  selectCanvas,
  selectRows,
  selectCols,
} from '../redux/paintSlice';

export function Canvas() {
  const dispatch = useDispatch();
  const {height, width} = useSelector(selectDimensions);
  const canvas = useSelector(selectCanvas);
  const rows = useSelector(selectRows);
  const cols = useSelector(selectCols);

  // Ensure that the canvas always fills as much space as possible without overflow
  const cellSize = Math.min(Math.floor(height/rows), Math.floor(width/cols));
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      function handleResize() {
        const { offsetHeight, offsetWidth } = canvasRef.current;
        dispatch(setDimensions({height: offsetHeight, width: offsetWidth}));
      }

      // Set initial dimensions, to replace the store's default values
      handleResize();
      // Also set dimensions whenever the window resizes
      window.addEventListener('resize', _.debounce(handleResize, 500));
    }
  }, [rows, cols, height, width, dispatch]);

  return (
    <main ref={canvasRef} id='canvas' className={styles.canvas}>
      { canvas.map((row, rIdx) => (
        <div key={`row-${rIdx}`} className={styles.row}>
          { row.map((color, cIdx) => (
            <Cell
              key={`cell-${rIdx}-${cIdx}`}
              className={styles.cell}
              color={color}
              row={rIdx}
              col={cIdx}
              size={cellSize}
              setCellColor={() => dispatch(setCellColor({row: rIdx, col: cIdx}))}
            />
          )) }
        </div>
      )) }
    </main>
  );
}
