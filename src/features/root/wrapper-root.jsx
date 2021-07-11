import { Box } from '@material-ui/core';

export function WrapperRoot (props) {
  return (
    <Box
      id="wrapper-root"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      {...props}
    />
  );
}
