import {
  Box,
  Typography
} from '@material-ui/core';

export function ListViewTop ({ title, children }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="baseline"
      mb={4}
    >
      <Typography
        component="h1"
        variant="h6"
      >
        { title }
      </Typography>
      { children }
    </Box>
  );
}
