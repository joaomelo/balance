import { IconButton } from '@material-ui/core';
import { DeleteTwoTone, EditTwoTone } from '@material-ui/icons';

export function ActionCell ({
  id,
  onDelClick,
  onEditClick
}) {
  return (
    <>
      <IconButton
        aria-label="edit"
        size="small"
        onClick={() => onEditClick(id)}
      >
        <EditTwoTone fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => onDelClick(id)}
      >
        <DeleteTwoTone fontSize="inherit" />
      </IconButton>
    </>
  );
}
