import { Box } from '@material-ui/core';

export function WrapperPage (props) {
  return (
    <Box
      id="wrapper-page"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flexGrow={1}
      width="100%"
      padding={4}
      {...props}
    />
  );
}
