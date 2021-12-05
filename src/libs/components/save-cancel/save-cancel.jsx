import { Button } from '@material-ui/core';
import { SaveTwoTone } from '@material-ui/icons';

export function SaveCancel ({ onCancel, isLoading }) {
  return (
    <>
      <Button
        id='buttonCancel'
        type='button'
        onClick={onCancel}
        variant="text"
        color="primary"
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        id='buttonSave'
        type='submit'
        variant="contained"
        color="primary"
        startIcon={<SaveTwoTone />}
        disabled={isLoading}
      >
        Save
      </Button>
    </>
  );
}
