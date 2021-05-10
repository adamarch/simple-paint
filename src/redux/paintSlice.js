import { createSlice }  from '@reduxjs/toolkit';
import floodFill        from 'n-dimensional-flood-fill';

const DEFAULT_ROWS = 10;
const DEFAULT_COLS = 10;

export const TOOLS = {
  PENCIL: 'pencil',
  FLOODFILL: 'flood fill',
};

const generateEmptyCanvas = (rows, cols) => {
  return new Array(rows).fill(new Array(cols).fill('#FFFFFF'));
}

const initialState = {
  dimensions: { height: 500, width: 500 },
  tool: TOOLS.PENCIL,
  brushColor: '#000000',
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS,
  canvas: generateEmptyCanvas(DEFAULT_ROWS, DEFAULT_COLS)
};

export const paintSlice = createSlice({
  name: 'paint',
  initialState,
  reducers: {
    setDimensions: (state, action) => {
      state.dimensions = action.payload;
    },
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    setBrushColor: (state, action) => {
      state.brushColor = action.payload;
    },
    setRows: (state, {payload}) => {
      const newRows = (!payload || payload < 1) ? 1 : payload;
      state.rows = newRows;
      state.canvas = generateEmptyCanvas(newRows, state.cols);
    },
    setCols: (state, {payload}) => {
      const newCols = (!payload || payload < 1) ? 1 : payload;
      state.cols = newCols;
      state.canvas = generateEmptyCanvas(state.rows, newCols);
    },
    setCellColor: ({ tool, canvas, brushColor }, action) => {
      const { row, col } = action.payload;
      switch (tool) {
        case TOOLS.PENCIL:
          canvas[row][col] = brushColor;
          break;
        case TOOLS.FLOODFILL:
          // Memory-friendly non-recursive implementation of the flood fill algorithm:
          // https://en.wikipedia.org/wiki/Flood_fill
          floodFill({
            getter: (r, c) => canvas[r][c],
            seed: [row, col],
          })
          ?.flooded
          ?.forEach(([r, c]) => {
            canvas[r][c] = brushColor;
          });
          break;
        default:
      }
    },
  },
});

export const {
  setDimensions,
  setTool,
  setBrushColor,
  setRows,
  setCols,
  setCellColor,
} = paintSlice.actions;

export const selectDimensions = (state) => state.paint.dimensions;
export const selectTool = (state) => state.paint.tool;
export const selectBrushColor = (state) => state.paint.brushColor;
export const selectRows = (state) => state.paint.rows;
export const selectCols = (state) => state.paint.cols;
export const selectCanvas = (state) => state.paint.canvas;

export default paintSlice.reducer;
