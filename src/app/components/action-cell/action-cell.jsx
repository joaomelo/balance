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
        size="small"
        onClick={() => onEditClick(id)}
      >
        <EditTwoTone fontSize="inherit" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => onDelClick(id)}
      >
        <DeleteTwoTone fontSize="inherit" />
      </IconButton>
    </>
  );
}
