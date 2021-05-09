import PropTypes from 'prop-types';

export function Cell({className, color, row, col, size, setCellColor}) {
  return (
    <button
      id={`cell-${row}-${col}`}
      className={className}
      aria-label={`Cell: row ${row}, column ${col}, color ${color}`}
      style={{
        backgroundColor: color,
        height: size,
        width: size,
      }}
      onClick={setCellColor}
      onKeyDown={(event) => {
        const goToCell = (r, c) => document.getElementById(`cell-${r}-${c}`)?.focus();

        switch(event.key) {
          // Allow quick navigation to the toolbar
          case 'Escape':
            return document.getElementById('toolbar')?.focus();
          // Allow using arrow keys to navigate the canvas
          case 'Up':    case 'ArrowUp':     return goToCell(row - 1, col);
          case 'Down':  case 'ArrowDown':   return goToCell(row + 1, col);
          case 'Left':  case 'ArrowLeft':   return goToCell(row, col - 1);
          case 'Right': case 'ArrowRight':  return goToCell(row, col + 1);
          default:
        }
      }}
    />
  );
}

Cell.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  row: PropTypes.number,
  col: PropTypes.number,
  size: PropTypes.number,
  setCellColor: PropTypes.func,
}

Cell.defaultProps = {
  color: '#FFFFFF',
}
