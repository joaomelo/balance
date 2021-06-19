import { Box } from '@material-ui/core';

export function WrapperLayout (props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      {...props}
    />
  );
}
