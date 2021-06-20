import { Box } from '@material-ui/core';

export function WrapperPage (props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      width="100%"
      padding={4}
      {...props}
    />
  );
}
