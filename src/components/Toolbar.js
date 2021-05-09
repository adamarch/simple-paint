import { BlockPicker }  from 'react-color';
import { FaPencilAlt }  from 'react-icons/fa';
import { VscPaintcan }  from 'react-icons/vsc';
import NumericInput     from 'react-numeric-input';
import styles           from './Toolbar.module.css';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  TOOLS,
  setTool,
  setBrushColor,
  setRows,
  setCols,
  selectTool,
  selectBrushColor,
  selectRows,
  selectCols,
} from '../redux/paintSlice';

const TOOL_BUTTON_SIZE = 40;

function DimensionSelector({title, value, onChange}) {
  return (
    <div className={styles['dimension-selector']}>
      <span>{title}:</span>
      <NumericInput mobile
        size={5}
        value={value}
        min={1}
        max={100}
        onChange={onChange}
      />
    </div>
  );
}

export function Toolbar() {
  const selectedTool = useSelector(selectTool);
  const brushColor = useSelector(selectBrushColor);
  const rows = useSelector(selectRows);
  const cols = useSelector(selectCols);
  const dispatch = useDispatch();

  const tools = [
    { id: TOOLS.PENCIL, Icon: FaPencilAlt },
    { id: TOOLS.FILL,   Icon: VscPaintcan, flipIcon: true },
  ];

  return (
    <section className={styles.toolbar} id='toolbar' tabIndex={0}>
      <h1 className={styles.title}>Simple Paint</h1>

      <div className={styles['toolbar-section']}>
        <h3>Select Tool</h3>
        <div className={styles.tools}>
          { tools.map(({id, Icon, flipIcon}) => (
            <button
              aria-label={`Use the ${id} tool`}
              key={id}
              className={styles['tool-button']}
              disabled={selectedTool === id}
              onClick={() => dispatch(setTool(id))}
            >
              <Icon size={TOOL_BUTTON_SIZE} style={flipIcon && {transform: 'scaleX(-1)'}} />
            </button>
          )) }
        </div>
      </div>

      <div className={styles['toolbar-section']}>
        <h3>Select Color</h3>
        <BlockPicker
          triangle='hide'
          color={brushColor}
          onChangeComplete={({hex}) => dispatch(setBrushColor(hex))}
          colors={[
            '#000000', '#D9E3F0', '#F47373', '#697689', '#37D67A',
            '#2CCCE4', '#555555', '#DCE775', '#FF8A65', '#BA68C8'
          ]}
        />
      </div>

      <div className={styles['toolbar-section']}>
        <h3>Select Dimensions</h3>
        <DimensionSelector
          title='Rows'
          value={rows}
          onChange={(newRows) => dispatch(setRows(newRows))}
        />
        <DimensionSelector
          title='Columns'
          value={cols}
          onChange={(newCols) => dispatch(setCols(newCols))}
        />
      </div>
    </section>
  );
}
